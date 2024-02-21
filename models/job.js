const jobs = []; // In-memory data store

exports.getAllJobs = () => {
  return jobs;
};

exports.getJobById = (id) => {
  return jobs.find((job) => job.id === id);
};

exports.createJob = (jobData) => {
  const newJob = {
    id: jobs.length + 1,
    jobData,
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
    const newApplicant = {
      applicantid: job.applicants.length + 1,
      ...applicantData,
      resumePath: `/uploads/resume_${job.id}_${job.applicants.length + 1}.pdf`, // Adjust the file path as needed
    };
    job.applicants.push(newApplicant);
    // Save the resume file (this is just a simple example, adjust as per your server setup)
    // fs.writeFileSync(path.join(__dirname, '..', 'public', 'uploads', `resume_${job.id}_${job.applicants.length}.pdf`), resume);
    return true;
  }
  return false;
};
