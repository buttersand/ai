import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://accounts:1svCfPA9Kpae@ep-square-math-a5itkttz.us-east-2.aws.neon.tech/ai-room-redesign?sslmode=require',
  },
});
