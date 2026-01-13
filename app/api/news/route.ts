// app/api/news/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.NEWS_API_KEY; 
  
  // Expanded parameters to include all requested global tech brands
  const brands = [
    "Apple", 
    "Samsung", 
    "Oppo", 
    "Vivo", 
    "Xiaomi", 
    "Redmi", 
    "OnePlus", 
    "Infinix", 
    "Tecno",
    "itel"
  ];
  
  const query = brands.join("+OR+");
  // We add +Smartphone to ensure the news is about their phones, not just the companies
  const url = `https://newsapi.org/v2/everything?q=(${query})+AND+Smartphone&language=en&sortBy=publishedAt&pageSize=6&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const data = await response.json();
    
    if (data.status === "error") {
      console.error("NewsAPI Error:", data.message);
      return NextResponse.json([]);
    }

    return NextResponse.json(data.articles || []);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}