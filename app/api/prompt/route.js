import prisma from '../../../utils/database';

export const GET = async (request) => {
  try {
    const prompts = await prisma.prompt.findMany({
      include: {
        creator: true
      }
    });

    return new Response(JSON.stringify(prompts), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return new Response(JSON.stringify({ error: "Failed to fetch all prompts" }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const POST = async (request) => {
  try {
    const { userId, prompt, tag } = await request.json();

    if (!userId || !prompt || !tag) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const newPrompt = await prisma.prompt.create({
      data: {
        prompt,
        tag,
        creatorId: userId
      },
      include: {
        creator: true
      }
    });

    return new Response(JSON.stringify(newPrompt), { 
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return new Response(JSON.stringify({ error: "Failed to create a new prompt" }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};