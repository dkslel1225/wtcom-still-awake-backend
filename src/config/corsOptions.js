export const corsOptions = {
  origin: [process.env.CLIENT_ORIGIN, "http://localhost:3000"],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
};
