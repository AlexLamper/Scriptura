"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, ExternalLink, Info } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import { Skeleton } from "../ui/skeleton"
import { useTranslation } from '../../app/i18n/client'

interface GeoImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  description: string;
  credit: string;
  creditUrl: string;
  license: string;
  placeName: string;
  verses: string[];
  modernId: string;
}

interface GeoImagesProps {
  book: string;
  chapter: number;
  className?: string;
}

export default function GeoImages({ book, chapter, className }: GeoImagesProps) {
  const { t } = useTranslation('study');
  const [images, setImages] = useState<GeoImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!book || !chapter) return;
      
      setLoading(true);
      setError(null);
      console.log(`[GeoImages] Fetching images for ${book} ${chapter}`);
      try {
        const res = await fetch(`/api/geo/images?book=${encodeURIComponent(book)}&chapter=${chapter}`);
        if (!res.ok) throw new Error('Failed to fetch images');
        const data = await res.json();
        setImages(data.images || []);
      } catch (err) {
        console.error(err);
        setError(t('geo_images.error_loading'));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [book, chapter]);

  if (loading) {
    return (
      <div className={`space-y-4 ${className || 'mt-8'}`}>
        <h3 className="text-lg font-semibold flex items-center gap-2 font-merriweather">
          <MapPin className="w-5 h-5" />
          {t('geo_images.locations_in_chapter')}
        </h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error || images.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className || 'mt-8'}`}>
      <h3 className="text-lg font-semibold flex items-center gap-2 font-merriweather">
        <MapPin className="w-5 h-5" />
        {t('geo_images.locations_in_book_chapter', { book, chapter })}
      </h3>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
        {images.map((image, index) => (
          <Dialog key={`${image.id}-${index}`}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={image.thumbnailUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      {t('geo_images.view_details')}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm truncate" title={image.placeName}>
                    {image.placeName}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate" title={image.description}>
                    {image.description}
                  </p>
                </div>
              </motion.div>
            </DialogTrigger>
            
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {image.placeName}
                </DialogTitle>
                <DialogDescription>
                  {t('geo_images.mentioned_in')} {image.verses.join(', ')}
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={image.thumbnailUrl.replace('640px', '1280px')} // Try to get higher res
                      alt={image.description}
                      fill
                      className="object-contain"
                      unoptimized // Since we're replacing URL parts, next/image optimization might be tricky or unnecessary for external
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">{t('geo_images.description')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {image.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{t('geo_images.modern_id')} {image.modernId}</Badge>
                    <Badge variant="outline">{image.license}</Badge>
                  </div>

                  <div className="text-xs text-muted-foreground border-t pt-4 mt-4">
                    <p>{t('geo_images.credit')} {image.credit}</p>
                    {image.creditUrl && (
                      <a 
                        href={image.creditUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline mt-1"
                      >
                        {t('geo_images.view_source')} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
