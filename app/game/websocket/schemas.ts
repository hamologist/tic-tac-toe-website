"use client";

import { z } from "zod";

export const getTicTacToeSchema = z.object({
  message: z.literal("Update"),
  action: z.literal("getTicTacToe"),
  gameState: z.object({
    expirationTime: z.number().transform((value) => new Date(value * 1000)),
    playerOne: z.string(),
    id: z.string(),
    playerTwo: z.string().nullable(),
    state: z.object({
      movesMade: z.number(),
      sessionState: z.number().transform((value) => value),
      currentPlayer: z.number().transform((value) => value),
      board: z.number().array().array().transform((value) => value),
    }),
  }),
});
export type GetTicTacToeMessage = z.infer<typeof getTicTacToeSchema>;

