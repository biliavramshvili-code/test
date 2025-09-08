import React, { useState, useEffect } from 'react';
import { Leaf, Recycle, Zap, Droplets, TreePine, Award, TrendingDown, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface SustainabilityMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up
