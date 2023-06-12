import { Request, Response, NextFunction } from "express";


export const getPagingData = (data: any, page: number, limit: number) => {
    const { count: total_items, rows: items } = data;
    const current_page = page ? +page : 1;
    const total_page = Math.ceil(total_items / limit);
  
    return { total_items,total_page,current_page, items};
  };

  
export function paginatedResults(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);
  
      const startIndex: number = (page - 1) * size;
      const endIndex: number = page * size;
  
      const results: any = {};
  
      if (endIndex < (await model[0].length)) {
        results.next = {
          page: page + 1,
          size: size,
        };
      }
  
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          size: size,
        };
      }
      try {
        results.results = await model[0].slice(startIndex, endIndex);
        (res as any).paginatedResults = results;
        next();
      } catch (e) {
        res.status(500).json({ message: "error 500" });
      }
    };
  }