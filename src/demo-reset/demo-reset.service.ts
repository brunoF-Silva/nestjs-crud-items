import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class DemoResetService {
  private readonly logger = new Logger(DemoResetService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async resetDatabase() {
    this.logger.log('Starting 2-hour database reset...');

    try {
      // 1. Wipe the current data
      // Order matters! Delete Items first to avoid foreign key constraint errors
      await this.prisma.item.deleteMany({});
      await this.prisma.user.deleteMany({});

      // 2. The "frozen" master data using a nested write
      await this.prisma.user.create({
        data: {
          id: 1,
          email: 'john@example.com',
          name: 'John Doe',
          password:
            '$2b$10$TY5qa5GLzLky/unDI5/8.OP/KctuLITvcTWK9XYFm39.emveJk9I2',
          items: {
            create: [
              {
                id: 37,
                longDescription:
                  'RetroTone Deluxe Pink Corded Telephone revives timeless communication design with a charming rotary dial aesthetic. Its solid construction and coiled cord offer reliable functionality while serving as a decorative centerpiece. Ideal for retro-themed rooms, cafés, or collectors, this telephone blends nostalgic flair with modern internal components for dependable use.',
                shortDescription:
                  'Vintage-inspired pink corded telephone featuring classic rotary design, durable handset, and decorative retro styling for nostalgic interiors.',
                name: 'RetroTone Deluxe Pink Corded Telephone',
                image:
                  'https://images.unsplash.com/photo-1769701486360-485f5a22b031?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '99',
                promoPrice: '79',
              },
              {
                id: 35,
                longDescription:
                  'SunStride Urban Yellow Sneakers are crafted for comfort and bold expression. The breathable upper keeps airflow steady during active days, while the cushioned midsole absorbs impact for extended wear. A textured rubber outsole enhances traction on various surfaces. Designed for casual outfits or sporty looks, these sneakers deliver energy and versatility in every step.',
                shortDescription:
                  'Comfort-focused yellow sneakers featuring cushioned soles, breathable mesh panels, and durable rubber outsoles for everyday movement and street style.',
                name: 'SunStride Urban Yellow Sneakers',
                image:
                  'https://images.unsplash.com/photo-1771049873881-45b23a2e9847?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '150',
                promoPrice: '119',
              },
              {
                id: 32,
                longDescription:
                  'The Imperial Horizons China Expedition offers a carefully curated journey through China’s most iconic destinations. Travellers explore historic landmarks, vibrant metropolitan districts, and breathtaking natural landscapes while enjoying expert local guides and seamless transportation. The itinerary blends cultural immersion, culinary discovery, and leisure time, ensuring a balanced and enriching experience. Premium hotels, organized excursions, and optional add-on activities provide both comfort and flexibility for an unforgettable international adventure.',
                shortDescription:
                  'Immersive guided travel package across China featuring cultural landmarks, modern city skylines, authentic cuisine experiences, and premium accommodations.',
                name: 'Imperial Horizons China Expedition',
                image:
                  'https://images.unsplash.com/photo-1770387795112-e2b476b15f71?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '4000',
                promoPrice: '3499',
              },
              {
                id: 29,
                longDescription:
                  'The Liberty Crest Premium American Flag is designed for lasting durability and bold presentation. Made from weather-resistant polyester with double-stitched seams, it maintains vibrant red, white, and blue tones even under sun exposure. Reinforced brass grommets provide secure mounting on poles or walls. Ideal for homes, offices, schools, and ceremonial events, this flag delivers a respectful and striking display of national pride.',
                shortDescription:
                  'High-quality American flag crafted with durable fabric, vibrant stitched colors, and reinforced grommets for indoor display or outdoor use.',
                name: 'Liberty Crest Premium American Flag',
                image:
                  'https://images.unsplash.com/photo-1771280776230-7cfdc28fa0aa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '45',
                promoPrice: '39',
              },
              {
                id: 28,
                longDescription:
                  'Crimson Royale Vintage Coupe blends mid-century automotive elegance with meticulous restoration detail. Its glossy red exterior highlights sweeping curves and polished chrome accents, while the interior features premium leather seating and retro instrumentation. Powered by a refined classic engine, it offers smooth cruising performance and authentic driving character. Perfect for collectors, exhibitions, or weekend drives, it represents enduring automotive heritage.',
                shortDescription:
                  'Classic red vintage coupe featuring timeless body lines, chrome detailing, and restored interior craftsmanship for collectors and enthusiasts.',
                name: 'Crimson Royale Vintage Coupe',
                image:
                  'https://images.unsplash.com/photo-1770215962752-332e28a05188?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '10000',
                promoPrice: '9900',
              },
              {
                id: 27,
                longDescription:
                  'Summit Quest Mount Everest Adventure is designed for travelers seeking a once-in-a-lifetime Himalayan experience. The journey includes guided trekking through breathtaking mountain trails, traditional Sherpa villages, and panoramic viewpoints leading to Everest Base Camp. Professional guides, acclimatization planning, and logistical support ensure safety and organization throughout the expedition. Comfortable lodges, group briefings, and optional helicopter returns enhance both security and overall experience for adventure-focused travelers.',
                shortDescription:
                  'High-altitude trekking adventure to Mount Everest Base Camp featuring guided Himalayan routes, scenic mountain views, and fully supported expedition planning.',
                name: 'Summit Quest Mount Everest Adventure',
                image:
                  'https://images.unsplash.com/photo-1771271949525-60603b18b16b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '3000',
                promoPrice: '2899',
              },
            ],
          },
        },
      });

      await this.prisma.user.create({
        data: {
          id: 2,
          email: 'alice@example.com',
          name: 'Alice Smith',
          password:
            '$2b$10$65J0/k4g.vGA3tDMr/H1JeAWXm9QBR4FofAoQa..yMf7itzyBeUjO',
          items: {
            create: [
              {
                id: 38,
                longDescription:
                  'SkyCanvas International Kite Festival Experience offers an unforgettable celebration of color and creativity. Guests enjoy large-scale kite exhibitions, synchronized aerial performances, and interactive workshops led by skilled artisans. The event atmosphere includes local cuisine vendors, cultural performances, and family-friendly entertainment. Designed for travelers and enthusiasts alike, it combines tradition, artistry, and open-sky excitement.',
                shortDescription:
                  'Vibrant cultural festival package featuring colorful kite displays, live performances, artisan markets, and immersive outdoor entertainment activities.',
                name: 'SkyCanvas International Kite Festival Experience',
                image:
                  'https://images.unsplash.com/photo-1770206124604-218d8cc535b5?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '299',
                promoPrice: '249.99',
              },
              {
                id: 36,
                longDescription:
                  'Aurora Reverie Original Canvas Painting is a one-of-a-kind artwork designed to elevate modern and classic interiors alike. Created with premium acrylic pigments on gallery-wrapped canvas, it showcases dynamic brushwork and carefully balanced color contrasts that evoke movement and emotion. Subtle texture layering adds depth, allowing light to interact uniquely from different angles. Ideal for living rooms, offices, studios, or curated art collections, this piece serves as a captivating focal point that enhances ambiance and visual identity.',
                shortDescription:
                  'Handcrafted contemporary painting featuring layered textures, expressive brushstrokes, and vibrant color harmony for sophisticated interior decoration.',
                name: 'Aurora Reverie Original Canvas Painting',
                image:
                  'https://images.unsplash.com/photo-1770129703548-e1ced0e4f118?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '1250',
                promoPrice: null,
              },
              {
                id: 34,
                longDescription:
                  'BlushShield Classic Pink Raincoat combines functionality with vibrant fashion appeal. Constructed from waterproof yet breathable material, it keeps you dry without sacrificing comfort. The adjustable hood and sealed seams provide enhanced rain protection, while its tailored silhouette ensures a flattering fit. Ideal for city commutes, festivals, or travel, it adds cheerful color to cloudy days.',
                shortDescription:
                  'Water-resistant pink raincoat designed with lightweight fabric, adjustable hood, and breathable lining for stylish protection in wet weather.',
                name: 'BlushShield Classic Pink Raincoat',
                image:
                  'https://images.unsplash.com/photo-1769708638741-172a56153eef?q=80&w=692&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '89',
                promoPrice: null,
              },
              {
                id: 33,
                longDescription:
                  'The Heritage Drift Vintage Steering Wheel captures the spirit of mid-century automotive design with its smooth wooden rim and brushed metal spokes. Carefully crafted for restoration enthusiasts and classic car collectors, it delivers both authentic aesthetics and reliable handling comfort. Its ergonomic curvature ensures a confident grip, while the retro finish enhances the interior character of vintage vehicles or showroom displays.',
                shortDescription:
                  'Classic vintage steering wheel featuring polished metal spokes, premium wood grip, and timeless craftsmanship for restoration projects or collectors.',
                name: 'Heritage Drift Vintage Steering Wheel',
                image:
                  'https://images.unsplash.com/photo-1770407297837-7cc2e8630599?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '300',
                promoPrice: '279',
              },
              {
                id: 31,
                longDescription:
                  'ProSphere Tournament Billiard Ball Set is engineered for consistent roll accuracy and long-lasting durability. Manufactured from high-density phenolic resin, each ball maintains perfect roundness and balanced weight distribution. The glossy, scratch-resistant finish enhances table glide and visibility, while bold numbering ensures clarity during competitive play. Ideal for home game rooms, clubs, and professional tournaments.',
                shortDescription:
                  'Professional-grade billiard ball set crafted from high-density resin, featuring precision balance, vivid numbering, and polished tournament-ready finish.',
                name: 'ProSphere Tournament Billiard Ball Set',
                image:
                  'https://images.unsplash.com/photo-1770802944430-3a2571c047e1?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '199',
                promoPrice: '179.99',
              },
              {
                id: 30,
                longDescription:
                  'The Emberline Classic Red Jacket combines modern tailoring with bold color presence. Constructed from durable yet breathable fabric, it provides comfort across seasons. A structured collar, reinforced stitching, and smooth inner lining ensure both functionality and refined style. Suitable for casual wear, evening events, or transitional weather, this jacket delivers confident fashion with practical everyday performance.',
                shortDescription:
                  'Stylish red jacket designed with premium fabric, tailored fit, and versatile layering comfort for casual outings or statement looks.',
                name: 'Emberline Classic Red Jacket',
                image:
                  'https://images.unsplash.com/photo-1770135157335-fa819e9ced2b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: '129',
                promoPrice: null,
              },
            ],
          },
        },
      });

      this.logger.log('Database successfully reset to frozen state!');
    } catch (error) {
      this.logger.error('Failed to reset database', error);
    }
  }
}
