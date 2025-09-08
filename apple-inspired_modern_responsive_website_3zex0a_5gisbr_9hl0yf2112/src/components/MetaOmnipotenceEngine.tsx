import React, { useState, useEffect } from 'react';
import { Infinity, Crown, Zap, Eye, Star, AlertTriangle, Atom } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetaPower {
  id: string;
  name: string;
  description: string;
  level:
