import { useState, useEffect } from 'react';
import { THEME } from '../theme.config';

// This is the URL of your WordPress site. 
// INSTRUCTIONS: Change this to your actual WordPress site URL.
const WP_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2/pages?slug=home'; 

export const useWordPress = () => {
  const [content, setContent] = useState(THEME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(WP_API_URL);
        const data = await response.json();

        if (data && data.length > 0) {
          const acf = data[0].acf; // Assuming you use ACF for fields
          
          if (acf) {
            // Merge WordPress data with existing THEME structure
            setContent(prev => ({
              ...prev,
              brand: {
                ...prev.brand,
                name: acf.brand_name || prev.brand.name,
                logoText: acf.brand_name || prev.brand.logoText,
              },
              intro: {
                ...prev.intro,
                sparkText: acf.intro_spark_text || prev.intro.sparkText,
                mantra1: acf.intro_mantra_1 || prev.intro.mantra1,
                mantra2: acf.intro_mantra_2 || prev.intro.mantra2,
              },
              productPhilosophy: {
                 heading: acf.philosophy_heading || prev.productPhilosophy.heading,
                 items: acf.philosophy_items ? acf.philosophy_items : prev.productPhilosophy.items
              },
              narrative: {
                ...prev.narrative,
                hero: {
                   line1: acf.hero_line_1 || prev.narrative.hero.line1,
                   line2: acf.hero_line_2 || prev.narrative.hero.line2,
                },
                // map other fields similarly...
              }
            }));
          }
        }
      } catch (error) {
        console.warn("Could not fetch WordPress data, falling back to local config.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { content, loading };
};
