// import { NextFunction, Request, Response } from 'express';
// // import TeamService from '../services/TeamService';

// const verifyMatches = async (req: Request, res: Response, next: NextFunction) => {
//   const { homeTeam, awayTeam } = req.body;
//   if (homeTeam === awayTeam) {
//     return res.status(422).json({
//       message: 'It is not possible to create a match with two equal teams' });
//   }
//   if (!findHome || !awayTeam) {
//     return res.status(404).json({
//       message: 'There is no team with such id!',
//     });
//   }
//   next();
// };

// export default verifyMatches;
