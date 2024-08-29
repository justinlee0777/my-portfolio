import { EldenRingEmbeddings } from '../../models/elden-ring-embeddings.model';

export default interface EldenRingScrapeResults {
  itemName: string;
  itemType: EldenRingEmbeddings['itemType'];
  chunks: Array<string>;
}
