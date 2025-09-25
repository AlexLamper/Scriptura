'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from '../../i18n/client';
import PlanCard from '../../../components/plans/PlanCard';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Card, CardContent } from '../../../components/ui/card';
import { Plus, Search, X } from 'lucide-react';
import { toast } from '../../../hooks/use-toast';

interface Reading {
  day: number;
  book: string;
  chapter: number;
  verses?: string;
}

interface BiblePlan {
  _id: string;
  title: string;
  description: string;
  isPublic: boolean;
  duration: number;
  category: string;
  readings: Reading[];
  createdBy: {
    _id: string;
    name: string;
  };
  enrolledUsers: string[];
  createdAt: string;
  updatedAt: string;
}

interface PlansPageProps {
  params: Promise<{ lng: string }>;
}

export default function PlansPage({ params }: PlansPageProps) {
  const resolvedParams = React.use(params);
  const lng = resolvedParams.lng;
  const { t } = useTranslation(lng, 'plans');
  const { data: session } = useSession();

  const [publicPlans, setPublicPlans] = useState<BiblePlan[]>([]);
  const [myPlans, setMyPlans] = useState<BiblePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'public' | 'my'>('public');

  const loadPlans = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Frontend: Loading plans...');
      console.log('Frontend: Session state:', !!session);
      console.log('Frontend: Session user:', session?.user);
      
      const response = await fetch('/api/bible-plans');
      const data = await response.json();
      console.log('Frontend: API response:', data);

      if (data.plans) {
        const plans = data.plans;
        console.log('Frontend: Processing plans:', plans.length);
        
        // Verdeel plannen in publiek en persoonlijk
        const publicPlans = plans.filter((plan: BiblePlan) => plan.isPublic);
        const myPlans = plans.filter((plan: BiblePlan) => 
          !plan.isPublic && plan.createdBy._id === (session?.user as { id?: string })?.id
        );

        console.log('Frontend: Public plans:', publicPlans.length);
        console.log('Frontend: My plans:', myPlans.length);
        console.log('Frontend: Session user ID:', (session?.user as { id?: string })?.id);

        setPublicPlans(publicPlans);
        setMyPlans(myPlans);
      } else {
        console.error('Frontend: No plans property in response:', data);
      }
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      loadPlans();
    }
  }, [session, loadPlans]);

  const handlePlanCreated = () => {
    loadPlans();
    setIsCreateModalOpen(false);
  };

  const handlePlanDeleted = () => {
    loadPlans();
  };

  const filteredPlans = (plans: BiblePlan[]) => {
    return plans.filter(plan => {
      const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plan.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || plan.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const categories = ['all', 'evangelie', 'psalmen', 'proverbs', 'profeten', 'brieven', 'apocalyps'];

  // Inline CreatePlanModal component
  const CreatePlanModal = ({ isOpen, onClose, onPlanCreated }: {
    isOpen: boolean;
    onClose: () => void;
    onPlanCreated: () => void;
  }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: 'evangelie',
      isPublic: false
    });
    const [readings, setReadings] = useState([{
      day: 1,
      book: 'Genesis',
      chapter: 1,
      verses: ''
    }]);

    const isAdmin = (session?.user as { isAdmin?: boolean })?.isAdmin || false;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!formData.title || !formData.description) {
        toast({
          title: 'Vul alle verplichte velden in',
          variant: 'destructive'
        });
        return;
      }

      setLoading(true);

      try {
        const response = await fetch('/api/bible-plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            duration: readings.length,
            readings: readings,
            isPublic: isAdmin ? formData.isPublic : false
          })
        });

        if (response.ok) {
          onPlanCreated();
          handleClose();
          toast({
            title: 'Leesplan succesvol aangemaakt'
          });
        } else {
          const error = await response.json();
          toast({
            title: error.error || 'Fout bij het aanmaken van het plan',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Error creating plan:', error);
        toast({
          title: 'Fout bij het aanmaken van het plan',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    const handleClose = () => {
      setFormData({
        title: '',
        description: '',
        category: 'evangelie',
        isPublic: false
      });
      setReadings([{
        day: 1,
        book: 'Genesis',
        chapter: 1,
        verses: ''
      }]);
      onClose();
    };

    const addReading = () => {
      setReadings(prev => [...prev, {
        day: prev.length + 1,
        book: 'Genesis',
        chapter: 1,
        verses: ''
      }]);
    };

    const removeReading = (index: number) => {
      setReadings(prev => {
        const newReadings = prev.filter((_, i) => i !== index);
        // Renumber days
        return newReadings.map((reading, i) => ({
          ...reading,
          day: i + 1
        }));
      });
    };

    const updateReading = (index: number, field: string, value: string | number) => {
      setReadings(prev => prev.map((reading, i) => 
        i === index ? { ...reading, [field]: value } : reading
      ));
    };

    if (!isOpen) return null;

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nieuw Leesplan</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Bijv. 30 Dagen Genesis"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beschrijving *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Beschrijf wat dit leesplan uniek maakt..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Categorie</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isAdmin && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="public"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                  />
                  <Label htmlFor="public" className="text-sm">
                    Openbaar maken (alleen voor admins)
                  </Label>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Lezingen</Label>
                <Button type="button" onClick={addReading} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Voeg toe
                </Button>
              </div>

              <div className="space-y-3 max-h-40 overflow-y-auto">
                {readings.map((reading, index) => (
                  <Card key={index} className="p-3">
                    <CardContent className="p-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Dag {index + 1}</span>
                        {readings.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeReading(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label className="text-xs">Boek</Label>
                          <Input
                            value={reading.book}
                            onChange={(e) => updateReading(index, 'book', e.target.value)}
                            placeholder="Genesis"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Hoofdstuk</Label>
                          <Input
                            type="number"
                            min="1"
                            value={reading.chapter}
                            onChange={(e) => updateReading(index, 'chapter', parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Verzen (optioneel)</Label>
                          <Input
                            value={reading.verses || ''}
                            onChange={(e) => updateReading(index, 'verses', e.target.value)}
                            placeholder="1-10"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleClose}>
                Annuleren
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Bezig...' : 'Opslaan'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            {t('loginRequired', 'Log in om leesplannen te bekijken')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {t('title', 'Bijbel Leesplannen')}
        </h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('createPlan', 'Nieuw Plan')}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6 w-fit">
        <button
          onClick={() => setActiveTab('public')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'public'
              ? 'bg-primary text-white'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {t('publicPlans', 'Openbare Plannen')}
        </button>
        <button
          onClick={() => setActiveTab('my')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'my'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {t('myPlans', 'Mijn Plannen')}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t('searchPlans', 'Zoek leesplannen...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('selectCategory', 'Selecteer categorie')} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? t('allCategories', 'Alle categorieën') : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">{t('loading', 'Laden...')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'public' && filteredPlans(publicPlans).map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              onEnrollmentChange={handlePlanDeleted}
              t={t}
            />
          ))}
          {activeTab === 'my' && filteredPlans(myPlans).map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              onEnrollmentChange={handlePlanDeleted}
              t={t}
            />
          ))}
          {activeTab === 'public' && filteredPlans(publicPlans).length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">
                {t('noPublicPlans', 'Geen openbare leesplannen gevonden')}
              </p>
            </div>
          )}
          {activeTab === 'my' && filteredPlans(myPlans).length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">
                {t('noMyPlans', 'Je hebt nog geen persoonlijke leesplannen')}
              </p>
            </div>
          )}
        </div>
      )}

      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPlanCreated={handlePlanCreated}
      />
    </div>
  );
}
