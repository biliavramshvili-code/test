import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  DollarSign,
  Eye,
  Clock,
  Target,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    growth: number;
    trend: Array<{ date: string; value: number; }>;
  };
  users: {
    total: number;
    active: number;
    new: number;
    retention: number;
    demographics: Array<{ age: string
