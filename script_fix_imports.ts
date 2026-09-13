import fs from 'fs';

let content = fs.readFileSync('src/components/GameWrapper.tsx', 'utf8');

// The file might now look like:
// import { useNavigate } from 'react-router-dom';
// import { Play, LogOut } from 'lucide-react';
// import { useEconomyStore } from '../store/economyStore';
// import { useAdStore } from '../store/adStore';
// import { Play, Sparkles } from 'lucide-react';

content = content.replace(/import \{ Play, Sparkles \} from 'lucide-react';/, '');

fs.writeFileSync('src/components/GameWrapper.tsx', content);
