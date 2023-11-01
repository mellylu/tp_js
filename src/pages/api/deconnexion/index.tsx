import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.setHeader('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC');
    res.status(200).json({ message: 'Déconnexion réussie' });

  } else {
    
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
};
