import { rest } from 'msw';
const universityHandlers = [
  rest.get('/', async (req, res, ctx) => {
    const country = req.url.searchParams.get('country');
    if (country) {
      return res(
        ctx.status(200),
        ctx.json({
          current_page: 1,
          per_page: 10,
          next_page: 2,
          prev_page: null,
          last_page: 2,
          data: [
            {
              _id: '626e8a83e8b2434c4f7fe76d',
              name: 'Allianze College of Medical Sciences (ACMS)',
              created_at: '2022-03-07T06:48:11.000Z',
              updated_at: '2022-03-07T06:48:11.000Z',
              'state-province': null,
              country: 'Malaysia',
              domains: ['acms.edu.my'],
              web_pages: ['http://www.acms.edu.my/'],
              __v: 0,
            },
          ],
        }),
      );
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          current_page: 1,
          per_page: 10,
          next_page: null,
          prev_page: null,
          last_page: 0,
          data: [],
          total: 0,
        }),
      );
    }
  }),
  // rest.get('/', async (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       current_page: 1,
  //       per_page: 5,
  //       next_page: 2,
  //       prev_page: null,
  //       last_page: 3,
  //       data: [
  //         {
  //           _id: '626e8a83e8b2434c4f7fe76d',
  //           name: 'Allianze College of Medical Sciences (ACMS)',
  //           created_at: '2022-03-07T06:48:11.000Z',
  //           updated_at: '2022-03-07T06:48:11.000Z',
  //           'state-province': null,
  //           country: 'Malaysia',
  //           domains: ['acms.edu.my'],
  //           web_pages: ['http://www.acms.edu.my/'],
  //           __v: 0,
  //         },
  //       ],
  //     }),
  //   );
  // }),
];
export const handlers = [...universityHandlers];
