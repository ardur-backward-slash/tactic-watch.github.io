import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { ScamTypes } from '@/entities';

export default function ScamsPage() {
  const { id } = useParams();
  const [scams, setScams] = useState<ScamTypes[]>([]);
  const [filteredScams, setFilteredScams] = useState<ScamTypes[]>([]);
  const [selectedScam, setSelectedScam] = useState<ScamTypes | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScams();
  }, []);

  useEffect(() => {
    if (id && scams.length > 0) {
      const scam = scams.find(s => s._id === id);
      setSelectedScam(scam || null);
    } else {
      setSelectedScam(null);
    }
  }, [id, scams]);

  useEffect(() => {
    filterScams();
  }, [scams, searchTerm, selectedCategory]);

  const loadScams = async () => {
    try {
      const { items } = await BaseCrudService.getAll<ScamTypes>('scamtypes');
      setScams(items);
    } catch (error) {
      console.error('Error loading scams:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterScams = () => {
    let filtered = scams;

    if (searchTerm) {
      filtered = filtered.filter(scam =>
        scam.scamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scam.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scam.characteristics?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scam => scam.category === selectedCategory);
    }

    setFilteredScams(filtered);
  };

  const getUniqueCategories = () => {
    const categories = scams.map(scam => scam.category).filter(Boolean);
    return [...new Set(categories)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary text-xl font-paragraph">Loading scam database...</div>
      </div>
    );
  }

  // Detail view for individual scam
  if (selectedScam) {
    return (
      <div className="min-h-screen bg-background text-foreground font-paragraph">
        {/* Header */}
        <div className="bg-dark-grey/50 border-b border-white/10 px-8 py-6">
          <div className="max-w-[100rem] mx-auto">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/scams">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Scams
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <div className="bg-destructive/20 p-3 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-heading text-white">
                  {selectedScam.scamName}
                </h1>
                {selectedScam.category && (
                  <Badge variant="outline" className="mt-2">
                    {selectedScam.category}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[100rem] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-dark-grey/80 border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-white">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-light-grey leading-relaxed">
                    {selectedScam.description}
                  </p>
                </CardContent>
              </Card>

              {selectedScam.characteristics && (
                <Card className="bg-dark-grey/80 border-white/10 mt-6">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-white">Characteristics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-light-grey leading-relaxed">
                      {selectedScam.characteristics}
                    </p>
                  </CardContent>
                </Card>
              )}

              {selectedScam.preventionTips && (
                <Card className="bg-primary/10 border-primary/30 mt-6">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-primary">Prevention Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-light-grey leading-relaxed">
                      {selectedScam.preventionTips}
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Visual Example */}
            {selectedScam.visualExample && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-dark-grey/80 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-white">Visual Example</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={selectedScam.visualExample}
                        alt={`Visual example of ${selectedScam.scamName}`}
                        width={600}
                        className="w-full h-auto"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      {/* Header */}
      <div className="bg-dark-grey/50 border-b border-white/10 px-8 py-12">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-destructive/20 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-heading text-white">Scam Types Database</h1>
                <p className="text-lg text-light-grey mt-2">
                  Learn to identify and protect yourself from common online scams
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-grey" />
                <Input
                  placeholder="Search scams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-dark-grey/80 border-white/20 text-white"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-dark-grey/80 border-white/20 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {getUniqueCategories().map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scams Grid */}
      <div className="max-w-[100rem] mx-auto px-8 py-12">
        {filteredScams.length === 0 ? (
          <div className="text-center py-16">
            <AlertTriangle className="h-16 w-16 text-light-grey mx-auto mb-4" />
            <h3 className="text-2xl font-heading text-white mb-2">No scams found</h3>
            <p className="text-light-grey">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScams.map((scam, index) => (
              <motion.div
                key={scam._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-dark-grey/80 border-white/10 hover:border-destructive/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl font-heading text-white">
                        {scam.scamName}
                      </CardTitle>
                      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 ml-2" />
                    </div>
                    {scam.category && (
                      <Badge variant="outline" className="w-fit">
                        {scam.category}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-light-grey mb-4 flex-1">
                      {scam.description && scam.description.length > 150
                        ? `${scam.description.substring(0, 150)}...`
                        : scam.description}
                    </CardDescription>
                    {scam.visualExample && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={scam.visualExample}
                          alt={`Preview of ${scam.scamName}`}
                          width={300}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                    <Button asChild variant="outline" className="w-full mt-auto">
                      <Link to={`/scams/${scam._id}`}>
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}