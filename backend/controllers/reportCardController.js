const ReportCard = require("../models/ReportCard");
const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) throw new Error("No API key for Gemini");

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const flashModel = gemini.getGenerativeModel({ model: "gemini-1.5-flash-002" });

/**
 * 
 * @param {{studentName: string; grades: Record<string, number>; qualities: string[]}} studentData 
 * @returns 
 */
exports.generateDescription = async (studentData) => {
  try {
    const {response} = await flashModel.generateContent(
      `Generate a detailed academic report card description for a student with the following data JSON.
      FORMAT OF INPUT: {
    studentName: String,
    grades: {
        English: Number,
        Hindi: Number,
        Mathematics: Number,
        Science: Number,
        SocialStudies: Number,
        ComputerScience: Number,
        PhysicalEducation: Number,
        Art: Number
    },
    qualities: [String],
}
      ${JSON.stringify(studentData)}.
      REPORT INSTRUCTIONS: For the report card you must create it with utmost detail, describing pitfalls and advantages, describing their future significance. You must keep the report concise.
      FORMAT FOR REPORT:
      [studentName]
      
      [description of qualities]
      
      _________
      Signature of Faculty
      `
    );
    return response.text();
  } catch (error) {
    throw error;
  }
};

exports.createReportCard = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const { studentName, grades, qualities } = body;
    const description = await this.generateDescription({grades, qualities, studentName});

    const reportCard = new ReportCard({
      studentName,
      grades,
      qualities,
      description,
    });

    const savedReportCard = await reportCard.save();
    res.status(201).json(savedReportCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReportCard = async (req, res) => {
  try {
    const reportCard = await ReportCard.findById(req.params.id);
    if (!reportCard) {
      return res.status(404).json({ message: "Report card not found" });
    }
    res.json(reportCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
