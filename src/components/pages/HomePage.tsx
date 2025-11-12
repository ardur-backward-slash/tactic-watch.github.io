import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  // Animation variants for the data stream effect
  const dataStreamVariants = {
    animate: {
      x: ['100vw', '-100vw'],
      transition: {
        duration: Math.random() * 10 + 5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  } as const;

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      {/* Hero Section with Glitching Data Stream */}
      <section className="h-screen grid place-items-center overflow-hidden relative">
        {/* Background Data Stream */}
        <div className="absolute inset-0 bg-black opacity-50">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary opacity-20"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: '2px',
                top: `${Math.random() * 100}%`,
              }}
              variants={dataStreamVariants}
              animate="animate"
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`vertical-${i}`}
              className="absolute bg-neon-blue opacity-15"
              style={{
                width: '1px',
                height: `${Math.random() * 150 + 30}px`,
                left: `${Math.random() * 100}%`,
              }}
              variants={{
                animate: {
                  y: ['100vh', '-100vh'],
                  transition: {
                    duration: Math.random() * 8 + 4,
                    repeat: Infinity,
                    ease: 'linear'
                  }
                }
              } as const}
              animate="animate"
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
          <motion.h1 
            className="text-7xl font-bold font-heading text-white mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Uncover the Scams
          </motion.h1>
          
          <motion.p 
            className="text-xl text-light-grey mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Navigate the digital landscape with confidence. Learn to identify and protect yourself 
            from online scams, deceptive tactics, and manipulative dark patterns.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Button asChild size="lg" className="text-lg px-8 py-4">
              <Link to="/scams">
                <Shield className="mr-2 h-5 w-5" />
                Explore Scam Types
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
              <Link to="/dark-patterns">
                <Eye className="mr-2 h-5 w-5" />
                Dark Patterns Guide
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-8">
        <div className="max-w-[100rem] mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold font-heading text-white mb-6">
              Digital Defense System
            </h2>
            <p className="text-lg text-light-grey max-w-3xl mx-auto">
              Comprehensive protection through knowledge and awareness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Scam Detection */}
            <motion.div 
              className="bg-dark-grey/80 border border-white/10 rounded-xl backdrop-blur-sm p-8 hover:border-primary/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="bg-primary/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-4">Scam Detection</h3>
              <p className="text-light-grey mb-6 leading-relaxed">
                Learn to identify common online scams including phishing, romance scams, 
                investment fraud, and more.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/scams">Explore Scams</Link>
              </Button>
            </motion.div>

            {/* Dark Patterns */}
            <motion.div 
              className="bg-dark-grey/80 border border-white/10 rounded-xl backdrop-blur-sm p-8 hover:border-neon-blue/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-neon-blue/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-neon-blue" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-4">Dark Patterns</h3>
              <p className="text-light-grey mb-6 leading-relaxed">
                Understand manipulative design tactics used to trick users into 
                unintended actions online.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dark-patterns">Learn More</Link>
              </Button>
            </motion.div>

            {/* Real-time Alerts */}
            <motion.div 
              className="bg-dark-grey/80 border border-white/10 rounded-xl backdrop-blur-sm p-8 hover:border-secondary/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-secondary/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <AlertTriangle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-4">Stay Vigilant</h3>
              <p className="text-light-grey mb-6 leading-relaxed">
                Get equipped with the knowledge to spot red flags and protect 
                yourself in real-time.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/scams">Get Protected</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-8 bg-dark-grey/30">
        <div className="max-w-[100rem] mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold font-heading text-white mb-6">
              Threat Intelligence
            </h2>
            <p className="text-lg text-light-grey">
              Understanding the scale of digital deception
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="text-5xl font-bold font-heading text-primary mb-4">$10.3B</div>
              <div className="text-light-grey">Lost to scams in 2022</div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-5xl font-bold font-heading text-neon-blue mb-4">2.6M</div>
              <div className="text-light-grey">Fraud reports filed</div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-5xl font-bold font-heading text-secondary mb-4">95%</div>
              <div className="text-light-grey">Prevention through awareness</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold font-heading text-white mb-6">
              Start Your Digital Defense Training
            </h2>
            <p className="text-lg text-light-grey mb-8 max-w-2xl mx-auto">
              Knowledge is your best defense against digital deception. Begin your journey 
              to safer online experiences today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/scams">
                  <Zap className="mr-2 h-5 w-5" />
                  Begin Training
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}