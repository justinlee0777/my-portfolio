import 'dotenv/config';

import { AuthorLocation, CityCoordinates } from 'author-map-ui';

import { AuthorModel } from '../../models/author-map/author.model';
import { CityCoordinatesModel } from '../../models/author-map/city-coordinates.model';
import connectToMongoDB from '../../page-utils/prospero/connect-to-mongodb.function';

async function getCityCoordinates(
  query: string
): Promise<CityCoordinates['coordinates'] | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'your-app-name',
    },
  });

  const data = await res.json();
  if (!data.length) {
    return null;
  } else {
    return [Number(data[0].lon), Number(data[0].lat)];
  }
}

async function getCoordinates() {
  await connectToMongoDB();

  const authors = await AuthorModel.find().lean();

  const locations: Map<string, Required<AuthorLocation>> = new Map();

  for (const { birthDate, deathDate } of authors) {
    if (birthDate.location) {
      if (birthDate.location.address && birthDate.location.state) {
        locations.set(
          `${birthDate.location.address}, ${birthDate.location.state}`,
          birthDate.location as Required<AuthorLocation>
        );
      }
    }

    if (deathDate?.location) {
      if (deathDate.location.address && deathDate.location.state) {
        locations.set(
          `${deathDate.location.address}, ${deathDate.location.state}`,
          deathDate.location as Required<AuthorLocation>
        );
      }
    }
  }

  console.log(`Locations found: ${locations.size}`);

  const results: Array<CityCoordinates> = [];

  for (const [query, location] of locations) {
    const coordinates = await getCityCoordinates(query);

    if (coordinates) {
      results.push({
        coordinates,
        location,
      });
    }

    console.log(`Number processed: ${results.length}`);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log('results', results);

  await CityCoordinatesModel.deleteMany();
  await CityCoordinatesModel.insertMany(results);
}

if (require.main === module) {
  getCoordinates()
    .then(() => {
      console.log('success');
      process.exit(0);
    })
    .catch((error) => {
      console.log('Error', error);
      process.exit(1);
    });
}
