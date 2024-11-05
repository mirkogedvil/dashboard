import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(minMax);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

export function getActiveProjectsCount(projects, interval = 'weekly') {
  if (!projects || projects.length === 0) {
    console.warn("No project data available.");
    return [];
  }

  // Validate interval
  const allowedIntervals = ['monthly', 'weekly'];
  if (!allowedIntervals.includes(interval)) {
    console.error(`Invalid interval: ${interval}. Must be 'monthly' or 'weekly'.`);
    return [];
  }

  const counts = [];
  const format = interval === 'monthly' ? 'YYYY-MM' : 'YYYY-MM-DD';

  // Calculate the date range based on project dates
  const startDate = dayjs.min(projects.map(p => dayjs(p.start_time)));
  const endDate = dayjs.max(projects.map(p => dayjs(p.end_time)));

  if (!startDate.isValid() || !endDate.isValid()) {
    console.error("Invalid project dates. Check the date format in your project data.");
    return [];
  }

  // Iterate over the date range by the specified interval
  let date = startDate.clone();
  let lastActiveCount = null;
  let moneyValue = 0;
  while (date.isBefore(endDate)) {
    const endOfPeriod = date.endOf(interval === 'monthly' ? 'month' : 'isoWeek');

    // Count active projects in the current interval
    const activeCount = projects.filter(project =>
      dayjs(project.start_time).isBefore(endOfPeriod) && dayjs(project.end_time).isAfter(date)
    ).length;

    const formattedDate = date.format(format);
    const weekInfo = interval === 'weekly' ? ` (W${date.week()})` : '';
    if (activeCount !== lastActiveCount) {
        moneyValue = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
        lastActiveCount = activeCount;
      }

    counts.push({
      date: `${formattedDate}${weekInfo}`,
      activeCount,
      moneyValue
    });

    // Move to the next period
    date = date.add(1, interval === 'monthly' ? 'month' : 'week');
  }
  return counts;
}
