import { setupServer } from 'msw/node';
import { handlers } from './handlers/cart';

export const server = setupServer(...handlers);
