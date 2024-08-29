import {Router} from 'express';
import Link from '../models/Link';
import {LinkMutation} from '../types';

const linksRouter = Router();

linksRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const {shortUrl} = req.params;

    if (!shortUrl) {
      return res.status(400).send({error: 'shortUrl the request'});
    }

    const link = await Link.findOne({shortUrl});

    if (link) {
      return res.status(301).redirect(link.originalUrl);
    } else {
      return res.status(404).send({error: 'Link not found'});
    }
  } catch (error) {
    next(error);
  }
});

const randomShortUrl = (length: number) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const alphabetLength = alphabet.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomLetters = Math.floor(Math.random() * alphabetLength);
    result += alphabet[randomLetters];
  }

  return result;
};

linksRouter.post('/', async (req, res, next) => {
  try {
    const {originalUrl} = req.body;

    if (!originalUrl) {
      return res.status(400).send({error: 'OriginalUrl the request'});
    }

    let shortUrl = randomShortUrl(7);

    while (await Link.exists({shortUrl})) {
      shortUrl = randomShortUrl(7);
    }

    const newLink: LinkMutation = {
      originalUrl,
      shortUrl,
    };

    const link = new Link(newLink);

    await link.save();
    return res.send(link);
  } catch (error) {
    next(error);
  }
});

export default linksRouter;