import { NewsArticle } from '@/types/news'; // Adjust the import path as necessary

// Helper function to get the logo URL
const getLogoUrl = (link: string): string => {
  return `https://logo.clearbit.com/${link}`;
};

// Main function to fetch and process news sentiment
export const getNewsByTicker = async (tickers: string[]): Promise<NewsArticle[]> => {
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

  if (!API_KEY) {
    throw new Error('ALPHA_VANTAGE_API_KEY is not defined in environment variables.');
  }

  if (!tickers || !Array.isArray(tickers) || tickers.length === 0) {
    throw new Error('Tickers array is required and cannot be empty.');
  }

  // Join tickers with '&&' as per your original logic
  const stringifiedTickers = tickers.join('&&');

  // Function to get the time from 24 hours ago
  const get24hAgo = (): string => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const date = yesterday.toISOString().split('T')[0].replace(/-/g, '');
    const time = yesterday.toISOString().split('T')[1].split(':').slice(0, 2).join('');

    return `${date}T${time}`;
  };

  const timeFrom = get24hAgo();

  const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${stringifiedTickers}&entitlement=realtime&time_from=${timeFrom}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch news sentiment data from Alpha Vantage.');
    }

    const data = await response.json();

    if (!data.feed || !Array.isArray(data.feed)) {
      throw new Error('Invalid data format received from Alpha Vantage.');
    }

    const newsArticles: NewsArticle[] = data.feed.map((article: any) => ({
      id: article.id || '',
      title: article.title || '',
      url: article.url || '',
      timePublished: article.time_published || '',
      authors: article.authors || [],
      summary: article.summary || '',
      bannerImage: article.banner_image || '',
      source: article.source || '',
      category: article.category_within_source || '',
      sourceDomain: article.source_domain || '',
      topics: article.topics || [],
      overallSentimentScore: article.overall_sentiment_score || 0,
      sentiment: article.overall_sentiment_label || '',
      tickerSentiment: article.ticker_sentiment || [],
      logo: getLogoUrl(article.source_domain) || '',
    }));

    return newsArticles;
  } catch (error) {
    console.error('Error in getNewsByTicker:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
