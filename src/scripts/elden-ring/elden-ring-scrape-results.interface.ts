import { EldenRingEmbeddings } from '../../models/elden-ring-embeddings.model';

export default interface EldenRingScrapeResults
  extends Pick<EldenRingEmbeddings, 'itemName' | 'itemType' | 'referenceUrl'> {
  chunks: Array<string>;
}
