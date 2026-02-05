const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const jobController = require('../controllers/jobController.js');
const jobModel = require('../models/job.js')
// Landing Page
router.get('/', (req, res) => {
  const currentUser = req.session.user;
  const jobs = jobModel.getAllJobs().slice(0, 3); // Get first 3 jobs as featured/recent
  res.render('landing', { currentUser, jobs, body: 'landing' });
});

// Job Listings Page
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.getAllJobs();
    const currentUser = req.session.user || null; // Ensure currentUser is defined

    res.render('jobListings', { jobs, currentUser });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

router.get('/jobs', jobController.getAllJobs);


// Job Details Page
router.get('/jobs/:id', jobController.getJobDetails);

// Applicant List Page
router.get('/jobs/:id/applicants', jobController.getApplicants);

// Login Page
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

// Registration Page
router.get('/register', userController.getRegistration);
router.post('/register', userController.postRegistration);

// New Job Page
router.get('/jobs/new', jobController.getNewJob);
router.post('/jobs/new', jobController.postNewJob);

// Update Job Page
router.get('/jobs/:id/update', jobController.getUpdateJob);
router.post('/jobs/:id/update', jobController.postUpdateJob);

// Delete Job Page
router.get('/jobs/:id/delete', jobController.getDeleteJob);

// Apply to Job Page
router.post('/apply/:id', jobController.postApplyJob);

// 404 Page
router.use((req, res) => {
  const currentUser = req.session.user || null; // Ensure currentUser is defined
  res.status(404).render('error404', { currentUser, body: 'error-404' });
});
module.exports = router;
