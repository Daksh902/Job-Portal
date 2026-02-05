const fs = require('fs');
const path = require('path');

const jobs = [
  {
    id: '1',
    companyname: "Tech Corp",
    jobdesignation: "Senior Frontend Developer",
    location: "Remote",
    salary: "$120k - $160k",
    description: "We are looking for an experienced Frontend Developer...",
    skillsrequired: ["React", "TypeScript", "CSS"],
    numberofopenings: 2,
    applyby: "2024-12-31",
    jobposted: new Date("2023-10-01"),
    applicants: []
  },
  {
    id: '2',
    companyname: "Startup Inc",
    jobdesignation: "Backend Engineer",
    location: "New York, NY",
    salary: "$130k - $170k",
    description: "Join our fast-paced team building scalable APIs...",
    skillsrequired: ["Node.js", "Express", "MongoDB"],
    numberofopenings: 1,
    applyby: "2024-11-30",
    jobposted: new Date("2023-10-05"),
    applicants: []
  },
  {
    id: '3',
    companyname: "Creative Studio",
    jobdesignation: "UI/UX Designer",
    location: "San Francisco, CA",
    salary: "$100k - $140k",
    description: "Design intuitive and beautiful user interfaces for our clients...",
    skillsrequired: ["Figma", "Sketch", "Adobe XD"],
    numberofopenings: 1,
    applyby: "2024-10-15",
    jobposted: new Date("2023-10-10"),
    applicants: []
  },
  {
    id: '4',
    companyname: "Data Systems",
    jobdesignation: "Data Scientist",
    location: "Austin, TX",
    salary: "$140k - $180k",
    description: "Analyze large datasets to derive actionable insights...",
    skillsrequired: ["Python", "Pandas", "Machine Learning"],
    numberofopenings: 3,
    applyby: "2025-01-20",
    jobposted: new Date("2023-10-12"),
    applicants: []
  },
  {
    id: '5',
    companyname: "Cloud Solutions",
    jobdesignation: "DevOps Engineer",
    location: "Remote",
    salary: "$130k - $170k",
    description: "Maintain and improve our cloud infrastructure...",
    skillsrequired: ["AWS", "Docker", "Kubernetes"],
    numberofopenings: 2,
    applyby: "2024-11-15",
    jobposted: new Date("2023-10-15"),
    applicants: []
  }
]; // In-memory data store

exports.getAllJobs = () => {
  return jobs;
};

exports.getJobById = (id) => {
  return jobs.find((job) => job.id === id);
};

exports.createJob = (jobData) => {
  // Convert id to string to match other usages if standard, but keeping number for now per existing code
  const newId = (jobs.length + 1).toString();
  const newJob = {
    id: newId,
    ...jobData,
    applicants: [],
    jobposted: new Date(),
  };
  jobs.push(newJob);
  return newJob;
};

exports.updateJob = (id, updatedJobData) => {
  const jobIndex = jobs.findIndex((job) => job.id === id);
  if (jobIndex !== -1) {
    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJobData };
    return jobs[jobIndex];
  }
  return null;
};

exports.deleteJob = (id) => {
  const jobIndex = jobs.findIndex((job) => job.id === id);
  if (jobIndex !== -1) {
    jobs.splice(jobIndex, 1);
    return true;
  }
  return false;
};

exports.getApplicants = (id) => {
  const job = jobs.find((job) => job.id === id);
  return job ? job.applicants : [];
};

exports.applyToJob = (id, applicantData, resume) => {
  const job = jobs.find((job) => job.id === id);
  if (job) {
    const applicantId = job.applicants.length + 1;
    const fileName = `resume_${job.id}_${applicantId}.pdf`;
    const newApplicant = {
      applicantid: applicantId,
      ...applicantData,
      resumePath: `/uploads/${fileName}`,
    };
    job.applicants.push(newApplicant);

    // Save the resume file
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(path.join(uploadDir, fileName), resume);

    return true;
  }
  return false;
};
