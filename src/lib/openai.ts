// import OpenAI from 'openai';

// // Initialize the OpenAI API client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, 
// });

// // Function to generate general financial advice
// export async function generateFinancialAdvice(prompt: string): Promise<string> {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 1000,
//       n: 1,
//       temperature: 0.7, 
//     });

//     return response.choices[0].message.content?.trim() || '';
//   } catch (error) {
//     console.error('Error generating financial advice:', error);
//     throw new Error('Failed to generate financial advice');
//   }
// }

// // Function to generate personalized financial advice based on user profile
// export async function generatePersonalizedFinancialAdvice(user: any, question: string, area: string): Promise<string> {
//   // Construct the prompt for the OpenAI API
//   const prompt = `
//     User Profile:
//     - Annual Income: $${user.annualIncome}
//     - Monthly Expenses: ${JSON.stringify(user.monthlyExpenses)}
//     - Current Savings: $${user.currentSavings}
//     - Financial Goals: ${user.financialGoals.join(', ')}
//     - Risk Tolerance: ${user.riskTolerance}

//     Question: ${question}
//     Area of Interest: ${area}

//     Given the user prompt and user profile, give the response according to the user's question. If the question is general, provide a general response.
//     If the user is asking for advice or any other help, use the information of the user profile to provide a good response. And build on the chat as you move further. Do not give advice if not asked for this.
//     Structure your response in Markdown format. Do not start the response with "Assitant", "Response" keep it general.
//   `;

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 1000,
//       n: 1,
//       temperature: 0.7,
//     });

//     return response.choices[0].message.content?.trim() || '';
//   } catch (error) {
//     console.error('Error generating personalized financial advice:', error);
//     throw new Error('Failed to generate personalized financial advice');
//   }
// }

// // Function to generate a strategy for achieving a specific financial goal
// export async function generateGoalStrategy(user: any, goal: any): Promise<string> {
//   // Construct the prompt for the OpenAI API
//   const prompt = `
//     User Profile:
//     - Annual Income: $${user.annualIncome}
//     - Monthly Expenses: ${JSON.stringify(user.monthlyExpenses)}
//     - Current Savings: $${user.currentSavings}
//     - Financial Goals: ${user.financialGoals.join(', ')}
//     - Risk Tolerance: ${user.riskTolerance}

//     Goal Details:
//     - Type: ${goal.type}
//     - Target Amount: $${goal.targetAmount}
//     - Current Amount: $${goal.currentAmount}
//     - Target Date: ${new Date(goal.targetDate).toLocaleDateString()}

//     Given the user's financial profile and goal details, generate a personalized strategy to help them achieve this financial goal. Include specific recommendations, potential challenges, and actionable steps. Structure your response in Markdown format.
//     In the response do not mention something like Dear Client or [User name] no placeholders should be present. Do not start the response with "Assitant", "Response" keep it general.
//   `;

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 1000,
//       n: 1,
//       temperature: 0.7,
//     });

//     return response.choices[0].message.content?.trim() || '';
//   } catch (error) {
//     console.error('Error generating goal strategy:', error);
//     throw new Error('Failed to generate goal strategy');
//   }
// }

// // Function to generate a chat response based on conversation history
// export async function generateChatResponse(p0: string, p1: string, messages: { role: string; content: string; }[]): Promise<string> {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: messages.map(msg => ({
//         role: msg.role as 'user' | 'assistant' | 'system', 
//         content: msg.content
//       })),
//       max_tokens: 1000,
//       n: 1,
//       temperature: 0.7,
//     });

//     return response.choices[0].message.content || '';
//   } catch (error) {
//     console.error('Error generating chat response:', error);
//     throw new Error('Failed to generate chat response');
//   }
// }

// export default openai;


import genAI from './gemini';
import { GoogleGenAI } from "@google/genai";
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function generateFinancialAdvice(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating financial advice:', error);
    throw new Error('Failed to generate financial advice');
  }
}

export async function generatePersonalizedFinancialAdvice(user: any, question: string, area: string): Promise<string> {
  const prompt = `
    User Profile:
    - Annual Income: $${user.annualIncome}
    - Monthly Expenses: ${JSON.stringify(user.monthlyExpenses)}
    - Current Savings: $${user.currentSavings}
    - Financial Goals: ${user.financialGoals.join(', ')}
    - Risk Tolerance: ${user.riskTolerance}

    Question: ${question}
    Area of Interest: ${area}

    Use this profile and question to give contextual financial advice in markdown format.
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: "AIzaSyATUe2TwwqrYq74RBTsBWzBJM35WN4XObw" });
    const res= await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Helo how are you",
    });
    console.log("ooooooooooooooo",res.text);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating personalized financial advice:', error);
    throw new Error('Failed to generate personalized financial advice');
  }
}

export async function generateGoalStrategy(user: any, goal: any): Promise<string> {
  const prompt = `
    User Profile:
    - Annual Income: $${user.annualIncome}
    - Monthly Expenses: ${JSON.stringify(user.monthlyExpenses)}
    - Current Savings: $${user.currentSavings}
    - Financial Goals: ${user.financialGoals.join(', ')}
    - Risk Tolerance: ${user.riskTolerance}

    Goal Details:
    - Type: ${goal.type}
    - Target Amount: $${goal.targetAmount}
    - Current Amount: $${goal.currentAmount}
    - Target Date: ${new Date(goal.targetDate).toLocaleDateString()}

    Generate a markdown-formatted personalized strategy to help achieve this goal.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating goal strategy:', error);
    throw new Error('Failed to generate goal strategy');
  }
}

export async function generateChatResponse(p0: string, p1: string, messages: { role: string; content: string }[]): Promise<string> {
  const chat = model.startChat({
    history: messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
  });

  try {
    const result = await chat.sendMessage(p1);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw new Error('Failed to generate chat response');
  }
}
