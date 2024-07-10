//Create a function named getLearnerData()

function getLearnerData(courseInfo, assignmentGroups, learnerSubmissions) {
    validateData(courseInfo, assignmentGroups);
    console.log('courseInfo:', courseInfo);
    console.log('assignmentGroups:', assignmentGroups);
    console.log('learnerSubmissions:', learnerSubmissions);

    let learners = {};

    // Process each submission
    learnerSubmissions.forEach(submission => {
        processSubmission(learners, submission, assignmentGroups);
    });

    // Return the formatted result
    return Object.values(learners).map(learner => formatOutput(learner));
}

function validateData(courseInfo, assignmentGroups) {
    // Validate the input
    assignmentGroups.forEach(group => {
        if (group.course_id !== courseInfo.id) {
            throw new Error(`Assignment group ${group.id} does not belong to course ${courseInfo.id}`);
        }
    });
}

function processSubmission(learners, submission, assignmentGroups) {
    let { learner_id, assignment_id, submission: sub } = submission;
    let assignment = findAssignment(assignment_id, assignmentGroups);

    if (!assignment) return;

    if (!learners[learner_id]) {
        learners[learner_id] = { id: learner_id, totalPoints: 0, totalMaxPoints: 0, assignments: {} };
    }

    if (new Date(sub.submitted_at) > new Date(assignment.due_at)) {
        sub.score -= assignment.points_possible * 0.1;
    }

    learners[learner_id].totalPoints += sub.score;
    learners[learner_id].totalMaxPoints += assignment.points_possible;
    learners[learner_id].assignments[assignment_id] = (sub.score / assignment.points_possible) * 100;
}

function findAssignment(assignment_id, assignmentGroups) {
    for (let group of assignmentGroups) {
        for (let assignment of group.assignments) {
            if (assignment.id === assignment_id) {
                return assignment;
            }
        }
    }
    return null;
}

function formatOutput(learner) {
    return {
        id: learner.id,
        avg: (learner.totalPoints / learner.totalMaxPoints) * 100,
        ...learner.assignments
    };
}

module.exports = {
    getLearnerData,
    validateData,
    processSubmission,
    formatOutput
};