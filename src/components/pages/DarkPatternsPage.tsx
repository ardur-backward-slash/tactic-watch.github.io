import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, ArrowLeft, Eye, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { DeceptiveTactics } from '@/entities';

export default function DarkPatternsPage() {
  const { id } = useParams();
  const [tactics, setTactics] = useState<DeceptiveTactics[]>([]);
  const [filteredTactics, setFilteredTactics] = useState<DeceptiveTactics[]>([]);
  const [selectedTactic, setSelectedTactic] = useState<DeceptiveTactics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTactics();
  }, []);

  useEffect(() => {
    if (id && tactics.length > 0) {
      const tactic = tactics.find(t => t._id === id);
      setSelectedTactic(tactic || null);
    } else {
      setSelectedTactic(null);
    }
  }, [id, tactics]);

  useEffect(() => {
    filterTactics();
  }, [tactics, searchTerm, selectedCategory]);

  const loadTactics = async () => {
    try {
      const { items } = await BaseCrudService.getAll<DeceptiveTactics>('deceptivetactics');
      setTactics(items);
    } catch (error) {
      console.error('Error loading tactics:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTactics = () => {
    let filtered = tactics;

    if (searchTerm) {
      filtered = filtered.filter(tactic =>
        tactic.tacticName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tactic.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tactic.characteristics?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tactic => tactic.category === selectedCategory);
    }

    setFilteredTactics(filtered);
  };

  const getUniqueCategories = () => {
    const categories = tactics.map(tactic => tactic.category).filter(Boolean);
    return [...new Set(categories)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary text-xl font-paragraph">Loading dark patterns database...</div>
      </div>
    );
  }

  // Detail view for individual tactic
  if (selectedTactic) {
    return (
      <div className="min-h-screen bg-background text-foreground font-paragraph">
        {/* Header */}
        <div className="bg-dark-grey/50 border-b border-white/10 px-8 py-6">
          <div className="max-w-[100rem] mx-auto">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/dark-patterns">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dark Patterns
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <div className="bg-neon-blue/20 p-3 rounded-lg">
                <Eye className="h-8 w-8 text-neon-blue" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-heading text-white">
                  {selectedTactic.tacticName}
                </h1>
                {selectedTactic.category && (
                  <Badge variant="outline" className="mt-2">
                    {selectedTactic.category}
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
                  <CardTitle className="text-2xl font-heading text-white">Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-light-grey leading-relaxed">
                    {selectedTactic.shortDescription}
                  </p>
                </CardContent>
              </Card>

              {selectedTactic.detailedExplanation && (
                <Card className="bg-dark-grey/80 border-white/10 mt-6">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-white">Detailed Explanation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-light-grey leading-relaxed">
                      {selectedTactic.detailedExplanation}
                    </p>
                  </CardContent>
                </Card>
              )}

              {selectedTactic.characteristics && (
                <Card className="bg-neon-blue/10 border-neon-blue/30 mt-6">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-neon-blue">Key Characteristics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-light-grey leading-relaxed">
                      {selectedTactic.characteristics}
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Visual Example */}
            {selectedTactic.visualExample && (
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
                        src={selectedTactic.visualExample}
                        alt={`Visual example of ${selectedTactic.tacticName}`}
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
              <div className="bg-neon-blue/20 p-3 rounded-lg">
                <Eye className="h-8 w-8 text-neon-blue" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-heading text-white">Dark Patterns Database</h1>
                <p className="text-lg text-light-grey mt-2">
                  Understand manipulative design tactics used to deceive users
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-grey" />
                <Input
                  placeholder="Search dark patterns..."
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

      {/* Tactics Grid */}
      <div className="max-w-[100rem] mx-auto px-8 py-12">
        {filteredTactics.length === 0 ? (
          <div className="text-center py-16">
            <Eye className="h-16 w-16 text-light-grey mx-auto mb-4" />
            <h3 className="text-2xl font-heading text-white mb-2">No dark patterns found</h3>
            <p className="text-light-grey">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTactics.map((tactic, index) => (
              <motion.div
                key={tactic._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-dark-grey/80 border-white/10 hover:border-neon-blue/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl font-heading text-white">
                        {tactic.tacticName}
                      </CardTitle>
                      <Zap className="h-5 w-5 text-neon-blue flex-shrink-0 ml-2" />
                    </div>
                    {tactic.category && (
                      <Badge variant="outline" className="w-fit">
                        {tactic.category}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-light-grey mb-4 flex-1">
                      {tactic.shortDescription && tactic.shortDescription.length > 150
                        ? `${tactic.shortDescription.substring(0, 150)}...`
                        : tactic.shortDescription}
                    </CardDescription>
                    {tactic.visualExample && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={tactic.visualExample}
                          alt={`Preview of ${tactic.tacticName}`}
                          width={300}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                    <Button asChild variant="outline" className="w-full mt-auto">
                      <Link to={`/dark-patterns/${tactic._id}`}>
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