export default interface BuzzwordBingoConfig {
    seo: {
        title: string;
        description: string;
    };
    textContent: {
        header: string;
        explanation: Array<string>;
    };
}