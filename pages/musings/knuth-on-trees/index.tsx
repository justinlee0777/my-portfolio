import { useMemo } from 'react';
import Font from '../../../src/models/font.enum';
import MusingPage from '../../../src/musings/components/musing/musing';
import { getBasePageProps } from '../../../src/page-utils/get-base-page-props.function';

export async function getStaticProps({ params }) {
  const baseProps = await getBasePageProps('en', '', true);

  return {
    props: {
      ...baseProps,
    },
  };
}

export default function KnuthOnTreesPage() {
  const contentHtml = useMemo(() => {
    return (
      <>
        <h1>Knuth on Trees</h1>
        <p>
          Knuth has a charming chapter on Trees in the first book of his famous
          "The Art of Computer Programming".
        </p>
        <p>
          I happened to have been bored enough to write some frontend code
          rendering Trees.
        </p>

        <p>This is the standard interface for a Node:</p>

        <p>
          Something that bothered me in developing these trees is how repetitive
          and "wide" they can be.
        </p>
        <p>
          Basically, the most elegant form of the tree, is the tree itself. The
          boilerplate, in contrast, is very messy.
        </p>
        <p>
          Is there a way to remedy this? Fortunately, Knuth had some handy
          answers.
        </p>
        <p>
          He shows a few representations of a list, most of which I'll show (the
          nested sets representation doesn't lend well to text format):
        </p>

        <p>
          Ultimately, what struck me as the most elegant and easiest form to
          write was the list view.
        </p>
        <p>But, take a look at Knuth's most complicated form of trees:</p>

        <p>
          These are quite wide and cumbersome in themselves. One can easily see
          how difficult it is for a writer to remember each bullet.
        </p>

        <h2>Traversal</h2>
      </>
    );
  }, []);

  return (
    <MusingPage
      font={Font.ARIAL}
      config={{
        slug: '/knuth-on-trees',
        display: {
          title: 'Knuth on Trees',
          timestamp: '',
          description: '',
          contentHtml,
        },
        seo: {
          title: '',
          description: '',
        },
      }}
    />
  );
}
