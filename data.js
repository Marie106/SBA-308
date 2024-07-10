// data.js

const courseInfo = {
    id: 1,
    name: "Sample Course"
};

const assignmentGroups = [
    {
        id: 1,
        name: "Group 1",
        course_id: 1,
        group_weight: 50,
        assignments: [
            {
                id: 1,
                name: "Assignment 1",
                due_at: "2024-07-01T00:00:00Z",
                points_possible: 100
            }
            // More assignments can be added here
        ]
    }
    // More assignment groups can be added here
];

const learnerSubmissions = [
    {
        learner_id: 1,
        assignment_id: 1,
        submission: {
            submitted_at: "2024-06-30T00:00:00Z",
            score: 90
        }
    }
    // More submissions can be added here
];

module.exports = {
    courseInfo,
    assignmentGroups,
    learnerSubmissions
};