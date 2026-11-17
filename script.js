/* ============================================
   Daily Attendance Tracker - JavaScript Logic
   ============================================ */

/**
 * AttendanceTracker
 * Manages student attendance tracking with automatic counter updates
 */
class AttendanceTracker {
    constructor() {
        // Store attendance status for each student (unmarked, present, absent)
        this.attendance = {
            john: 'unmarked',
            mary: 'unmarked',
            peter: 'unmarked'
        };

        // Cache DOM elements
        this.studentCards = document.querySelectorAll('.student-card');
        this.presentCountEl = document.getElementById('presentCount');

        // Initialize event listeners
        this.init();
    }

    /**
     * Initialize event listeners for all student action buttons
     */
    init() {
        this.studentCards.forEach(card => {
            const studentId = card.dataset.studentId;
            const buttons = card.querySelectorAll('.btn');

            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const action = e.target.dataset.action;
                    this.updateAttendance(studentId, action);
                });
            });
        });

        // Initial render
        this.render();
    }

    /**
     * Update attendance status for a specific student
     * Only one status per student is allowed
     * @param {string} studentId - The ID of the student
     * @param {string} status - The attendance status (present or absent)
     */
    updateAttendance(studentId, status) {
        this.attendance[studentId] = status;
        this.render();
    }

    /**
     * Render UI updates based on current attendance state
     * Updates status badges, button states, and counter
     */
    render() {
        this.studentCards.forEach(card => {
            const studentId = card.dataset.studentId;
            const currentStatus = this.attendance[studentId];

            // Update status badge
            const statusEl = card.querySelector('.student-status');
            statusEl.textContent = this.formatStatus(currentStatus);
            statusEl.className = `student-status ${currentStatus}`;

            // Update button states (active class indicates selected status)
            const presentBtn = card.querySelector('[data-action="present"]');
            const absentBtn = card.querySelector('[data-action="absent"]');

            presentBtn.classList.toggle('active', currentStatus === 'present');
            absentBtn.classList.toggle('active', currentStatus === 'absent');
        });

        // Update counter
        this.updateCounter();
    }

    /**
     * Count present students and update the counter display
     */
    updateCounter() {
        const presentCount = Object.values(this.attendance).filter(
            status => status === 'present'
        ).length;

        this.presentCountEl.textContent = presentCount;
    }

    /**
     * Format status text for display (capitalize first letter)
     * @param {string} status - The status to format
     * @returns {string} - Formatted status text
     */
    formatStatus(status) {
        if (status === 'unmarked') return 'Unmarked';
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
}

/**
 * Initialize the application when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    new AttendanceTracker();
});
