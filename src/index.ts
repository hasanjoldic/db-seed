interface SeedStep<T = unknown> {
  shouldApplyMutation: boolean;
  data: T[];
  mutation: (data: T[]) => Promise<void>;
}

export async function seed(seedSteps: SeedStep[]) {
  for (const seedStep of seedSteps) {
    const { shouldApplyMutation, data, mutation } = seedStep;
    if (shouldApplyMutation) {
      await mutation(data);
    }
  }
}
