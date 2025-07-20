import { db, type BubbleTea } from '@/dexie/db';

export class BubbleTeaService {
  public static async getBubbleTeas() {
    return await db.bubbleTeas.reverse().toArray();
  }

  public static getFields() {
    const { primKey, indexes } = db.bubbleTeas.schema;
    return [primKey, ...indexes]
      .map((spec) => spec.keyPath)
      .filter((field) => typeof field === 'string');
  }

  public static async insertIfEmpty() {
    // TODO: Load all bubble tea data from JSON file
    const bubbleTeas = await this.getBubbleTeas();
    if (!bubbleTeas.length) {
      console.log('Database is empty. Inserting default bubble tea data...');
      await db.bubbleTeas.bulkAdd([
        {
          id: 99,
          name: 'Test Tea',
          isListed: true,
          description: 'A test tea',
          assetPath: 'brown_sugar_bubble_cocoa_milk.webp',
          currency: 'HKD',
          price: 10,
          labels: ['popular'],
        },
      ]);
    } else {
      console.log('Database already has data. No action taken.');
    }
  }

  public static async listBubbleTea(data: BubbleTea) {
    // TODO: List one bubble tea
    await db.bubbleTeas.update(data.id, { isListed: true });
    console.log(`Bubble rea with ID ${data.id} is now listed.`);

  }

  public static async delistBubbleTea(data: BubbleTea) {
    // TODO: Delist one bubble tea
    await db.bubbleTeas.update(data.id, { isListed: false });
    console.log(`Bubble rea with ID ${data.id} is now delisted.`);
  }

  public static async listAllBubbleTea() {
    // TODO: List all bubble teas
    const bubbleTeas = await db.bubbleTeas.toArray();
    const updatedTeas = bubbleTeas.map((bubbleTea) => ({
      ...bubbleTea,
      isListed: true,
    }));
    await db.bubbleTeas.bulkPut(updatedTeas);
    console.log('All bubble teas are now listed.');
  }

  public static async delistAllBubbleTea() {
    // TODO: Delist all bubble teas
    const bubbleTeas = await db.bubbleTeas.toArray();
    const updatedTeas = bubbleTeas.map((bubbleTea) => ({
      ...bubbleTea,
      isListed: false,
    }));
    await db.bubbleTeas.bulkPut(updatedTeas);
    console.log('All bubble teas are now delisted.');
  }
}
