// Edit this list to match your university's actual module handbook.
// year: 1-3, semester: 1 or 2 (within that year)
const SUBJECTS = [
  // ---------- Year 1 ----------
  { year: 1, semester: 1, code: "AMT112β", name: "Mathematical Foundation of Computer Science", credits: 2.5 },
  { year: 1, semester: 1, code: "CSC1113", name: "Programming Techniques", credits: 3 },
  { year: 1, semester: 1, code: "CSC1122", name: "Computer Systems 1", credits: 2 },
  { year: 1, semester: 1, code: "CSC113α", name: "Internet Services and Web Development ", credits: 1.5 },
  { year: 1, semester: 1, code: "CSC1142", name: "System Analyst & Design", credits: 2 },
  { year: 1, semester: 1, code: "CSC1153", name: "Laboratory Assignment", credits: 3 },
  { year: 1, semester: 1, code: "MAT112d", name: "Differential Equation", credits: 1.25 },
  { year: 1, semester: 1, code: "MAT113d", name: "Introductory Statistics", credits: 1.25 },

  { year: 1, semester: 2, code: "CSC1213", name: "Database Management Systems", credits: 3 },
  { year: 1, semester: 2, code: "CSC1223", name: "Data Structure and Algorithms", credits: 3 },
  { year: 1, semester: 2, code: "CSC1233", name: "Software Engineering", credits: 3 },
  { year: 1, semester: 2, code: "CSC1242", name: "Object Oriented System Development", credits: 2 },
  { year: 1, semester: 2, code: "CSC1251", name: "Computer Laboratory", credits: 1 },
  { year: 1, semester: 2, code: "MAT121β", name: "Algebra", credits: 2.5 },
  { year: 1, semester: 2, code: "MAT122β", name: "Calculus", credits: 2.5 },
  //{ year: 1, semester: 2, code: "ENG1b10", name: "English proficiency Level I", credits: 0 },

  
  // ---------- Year 2 ----------
  { year: 2, semester: 1, code: "CSC2113", name: "Data Communication and Computer Networks", credits: 3 },
  { year: 2, semester: 1, code: "CSC2123", name: "Object Oriented Programming", credits: 3 },
  { year: 2, semester: 1, code: "CSC2133", name: "Operating Systems", credits: 3 },
  { year: 2, semester: 1, code: "CSC2143", name: "Computer Graphics and Image Processing", credits: 3 },
  { year: 2, semester: 1, code: "AMT212β", name: "Computational Mathematics ", credits: 2.5 },
  { year: 2, semester: 1, code: "MAT211β", name: "Linear Algebra I ", credits: 2.5 },

  { year: 2, semester: 2, code: "CSC2213", name: "Rapid Application Development", credits: 3 },
  { year: 2, semester: 2, code: "CSC2222", name: "Computer System II", credits: 2 },
  { year: 2, semester: 2, code: "CSC2233", name: "Internet Programming", credits: 4 },
  { year: 2, semester: 2, code: "CSC2242", name: "Advanced Database Management", credits: 3 },
  { year: 2, semester: 2, code: "CSC2252", name: "Project Management", credits: 2 },
  { year: 2, semester: 2, code: "CSC2263", name: "Multimedia and Video Production", credits: 3 },
  { year: 2, semester: 2, code: "CSC2272:", name: "Data and Network Security", credits: 2 },
  { year: 2, semester: 2, code: "MAT225β:", name: "Mathematical Statistics I", credits: 2 },


  // ---------- Year 3 ----------
  { year: 3, semester: 1, code: "CS301", name: "Artificial Intelligence", credits: 4 },
  { year: 3, semester: 1, code: "CS302", name: "Machine Learning", credits: 4 },
  { year: 3, semester: 1, code: "CS303", name: "Distributed Systems", credits: 3 },
  { year: 3, semester: 1, code: "CS304", name: "Information Security", credits: 3 },
  { year: 3, semester: 1, code: "CS305", name: "Mobile App Development", credits: 3 },

  { year: 3, semester: 2, code: "CS311", name: "Cloud Computing", credits: 3 },
  { year: 3, semester: 2, code: "CS312", name: "Elective I", credits: 3 },
  { year: 3, semester: 2, code: "CS313", name: "Elective II", credits: 3 },
  { year: 3, semester: 2, code: "CS314", name: "Research Project I", credits: 4 },
  { year: 3, semester: 2, code: "CS315", name: "Professional Ethics", credits: 2 },
];

// Grade -> grade point mapping. Adjust to your institution's scale.
const GRADE_POINTS = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D": 1.0,
  "E": 0.0,
  "-": null // not taken yet
};
