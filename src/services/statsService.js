class StatsService {
    #repositorys
    constructor(repository) {
        this.#repositorys = repository
    }


    async getTotalCounts() {
        const [
            totalClients,
            activeClients,
            totalSliders,
            totalUser,
            unreadEnquiries,
            totalEnquiries,
            unreadNotifications,
            activeSocialLinks,
        ] = await Promise.all([
            this.#repositorys.getTotalClients(),
            this.#repositorys.getActiveClients(),
            this.#repositorys.getTotalSliders(),
            this.#repositorys.getTotalUsers(),
            this.#repositorys.getUnreadEnquiries(),
            this.#repositorys.getTotalEnquiries(),
            this.#repositorys.getUnreadNotifications(),
            this.#repositorys.getActiveSocialLinks(),
        ]);

        return {
            clients: {
                total: totalClients,
                active: activeClients
            },
            sliders: {
                total: totalSliders
            },
            users: {
                total: totalUser
            },
            enquiries: {
                total: totalEnquiries,
                unread: unreadEnquiries
            },
            notifications: {
                unread: unreadNotifications
            },
            social: {
                active: activeSocialLinks
            },
        };
    }

    async getEnquiryStats() {
        const groupedData = await this.#repositorys.getEnquiriesLast7Days();

        const chartData = [["Date", "Enquiries"]];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const formattedDate = date.toISOString().split("T")[0];
            chartData.push([formattedDate, groupedData[formattedDate] || 0]);
        }

        return chartData.reverse();
    }


    async activeUsersAnalytics(dateRange = { startDate: '30daysAgo', endDate: 'today' }) {
        try {
            const result = await this.#repositorys.fetchActiveUsers(dateRange);
            
            if (!result?.length) {
                return [];
            }

            return result.map(item => ({
                activeUsers: parseInt(item.activeUsers),
                date: item.date
            }));
        } catch (error) {
            console.error('Error in activeUsersAnalytics:', error);
            throw new Error('Failed to fetch active users data');
        }
    }

    async engagedSessionsAnalytics(dateRange = { startDate: '30daysAgo', endDate: 'today' }) {
        try {
            const result = await this.#repositorys.fetchEngagedSessions(dateRange);
            
            if (!result?.length) {
                return [];
            }

            return result.map(item => ({
                engagedSessions: parseInt(item.engagedSessions),
                date: item.date
            }));
        } catch (error) {
            console.error('Error in engagedSessionsAnalytics:', error);
            throw new Error('Failed to fetch engaged sessions data');
        }
    }

    async cityStatsAnalytics(dateRange = { startDate: '30daysAgo', endDate: 'today' }) {
        try {
            const result = await this.#repositorys.fetchCityStats(dateRange);
            
            if (!result?.length) {
                return [];
            }

            return result.map(item => ({
                city: item.city,
                activeUsers: parseInt(item.activeUsers)
            })).sort((a, b) => b.activeUsers - a.activeUsers);
        } catch (error) {
            console.error('Error in cityStatsAnalytics:', error);
            throw new Error('Failed to fetch city statistics');
        }
    }

    async pageViewsAnalytics(dateRange = { startDate: '30daysAgo', endDate: 'today' }) {
        try {
            const result = await this.#repositorys.fetchPageViews(dateRange);
            
            if (!result?.length) {
                return [];
            }

            return result.map(item => ({
                totalPageViews: parseInt(item.screenPageViews),
                date: item.date
            }));
        } catch (error) {
            console.error('Error in pageViewsAnalytics:', error);
            throw new Error('Failed to fetch page views data');
        }
    }

    async bounceRateAnalytics(dateRange = { startDate: '30daysAgo', endDate: 'today' }) {
        try {
            const result = await this.#repositorys.fetchBounceRate(dateRange);
            
            if (!result?.length) {
                return [];
            }

            return result.map(item => ({
                bounceRate: parseFloat(item.bounceRate).toFixed(2),
                date: item.date
            }));
        } catch (error) {
            console.error('Error in bounceRateAnalytics:', error);
            throw new Error('Failed to fetch bounce rate data');
        }
    }

    async pageViewsByPageAnalytics(dateRange = { startDate: '30daysAgo', endDate: 'today' }) {
        try {
            const result = await this.#repositorys.fetchPageViewsByPage(dateRange);
            
            if (!result?.length) {
                return [];
            }

            return result.map(item => ({
                pagePath: item.pagePath,
                pageViews: parseInt(item.screenPageViews)
            })).sort((a, b) => b.pageViews - a.pageViews);
        } catch (error) {
            console.error('Error in pageViewsByPageAnalytics:', error);
            throw new Error('Failed to fetch page views by page data');
        }
    }

    async trafficSourcesAnalytics(dateRange = { startDate: '30daysAgo', endDate: 'today' }) {
        try {
            const result = await this.#repositorys.fetchTrafficSources(dateRange);
            
            if (!result?.length) {
                return [];
            }

            // Process traffic sources data
            const processedData = result.map(item => ({
                channel: item.sessionDefaultChannelGroup,
                sessions: parseInt(item.sessions),
                users: parseInt(item.totalUsers)
            })).filter(item => 
                [
                    'Organic Search',
                    'Paid Search', 
                    'Direct',
                    'Referral',
                    'Social',
                    'Email',
                    'Display',
                    'Affiliates'
                ].includes(item.channel)
            );

            const totalSessions = processedData.reduce((sum, item) => sum + item.sessions, 0);

            const finalData = processedData.map(item => ({
                ...item,
                percentage: ((item.sessions / totalSessions) * 100).toFixed(1)
            })).sort((a, b) => b.sessions - a.sessions);

            return {
                sources: finalData,
                summary: {
                    totalSessions,
                    totalUsers: finalData.reduce((sum, item) => sum + item.users, 0)
                }
            };
        } catch (error) {
            console.error('Error in trafficSourcesAnalytics:', error);
            throw new Error('Failed to fetch traffic sources data');
        }
    }

    async sessionDurationAnalytics(dateRange = { startDate: '30daysAgo', endDate: 'today' }) {
        try {
            const result = await this.#repositorys.fetchSessionDuration(dateRange);
            
            if (!result?.length) {
                return [];
            }

            return result.map(item => ({
                source: item.sessionSourceMedium || 'Unknown',
                avgSessionDuration: parseFloat(item.averageSessionDuration).toFixed(2)
            })).sort((a, b) => b.avgSessionDuration - a.avgSessionDuration);
        } catch (error) {
            console.error('Error in sessionDurationAnalytics:', error);
            throw new Error('Failed to fetch session duration data');
        }
    }

    async totalEnquiriesAnalytics() {
        try {
            const totalEnquiries = await this.#repositorys.getTotalEnquiriesCount();
            return totalEnquiries;
        } catch (error) {
            console.error('Error in totalEnquiriesAnalytics:', error);
            throw new Error('Failed to fetch total enquiries');
        }
    }

    async newsletterSubscribersAnalytics() {
        try {
            const totalSubscribers = await this.#repositorys.getTotalNewsletterSubscribers();
            return totalSubscribers;
        } catch (error) {
            console.error('Error in newsletterSubscribersAnalytics:', error);
            throw new Error('Failed to fetch newsletter subscribers');
        }
    }


    

}
export default StatsService