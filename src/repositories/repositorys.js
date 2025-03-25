import prisma from "../helpers/prisma.js"
import { v4 as uuidv4 } from 'uuid';


class Repositorys {

  /**
   * User Repository - Handles CRUD operations for user management.
   */

  async createUser(userData) {
    return await prisma.user.create({
      data: userData,
    });
  }

  async updateUser(id, name, email, role) {
    return await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        email,
        role,
      },
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async deleteUser(id) {
    return await prisma.user.delete({
      where: {
        id
      },
    });

  }
  async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id) {
    return await prisma.user.findUnique({
      where: {
        id
      },
    });
  }



  /**
   * Enquiry Repository - Handles CRUD operations for Enquiry management.
   */

  async createEnquiry(enquiryData) {

    return await prisma.enquiry.create({ data: enquiryData });
  }

  async getAllEnquiries() {
    return await prisma.enquiry.findMany();
  }

  async deleteEnquiry(enquiryId) {
    return await prisma.enquiry.delete({
      where: { id: enquiryId },
    })
  }
  async  filterEnquiry(filters) {
  return await prisma.enquiry.findMany({
    where: filters,
    orderBy: { createdAt: 'desc' },
  });
}


  /**
   * OrganizationDetails Repository - Handles CRUD operations for OrganizationDetails management.
   */

  async createOrganizationDetails(organizationData) {

    return await prisma.organizationDetails.create({ data: organizationData });
  }

  async getOrganizationDetails() {

    return await prisma.organizationDetails.findMany();
  }
  async editOrganization(organizationId, organizationDetails) {
    return await prisma.organizationDetails.update({
      where: { id: organizationId },
      data: organizationDetails,
    });
  }


  /**
   * Slider Repository - Handles CRUD operations for Slider management.
   */

  async createSlider(sliderData) {
    return await prisma.slider.create({ data: sliderData });

  }
  async getAllSlider() {
    return await prisma.slider.findMany({
      orderBy:{
        order:'asc'
      }
    });

  }
  async editSlider(sliderId, updatedData) {
    return await prisma.slider.update({
      where: { id: sliderId },
      data: updatedData,
    });
  }
  async deleteSlider(sliderId) {
    return await prisma.slider.delete({
      where: { id: sliderId },
    });
  }




  /**
   * Social Repository - Handles CRUD operations for Social management.
   */


  async createSocial(platform, url, isActive) {
    return await prisma.social.create({
      data: {
        id: uuidv4(),
        platform: platform.toLowerCase(),
        url,
        isActive: isActive !== undefined ? isActive : true,
      },
    });
  }

  async updateSocial(id, platform, url, isActive, existingSocial) {
    return await prisma.social.update({
      where: { id },
      data: {
        platform: platform === undefined ? existingSocial.platform : platform,
        url: url !== undefined ? url : existingSocial.url,
        isActive: isActive !== undefined ? isActive : existingSocial.isActive,
        updatedAt: new Date()
      }
    });
  }

  async getAllSocials() {
    return await prisma.social.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteSocial(id) {
    return await prisma.social.delete({
      where: { id }
    });
  }

  async findSocialById(id) {
    return await prisma.social.findUnique({
      where: {
        id
      },
    });
  }
  async findFirstSocial(platform) {
    return await prisma.social.findFirst({
      where: { platform: platform.toLowerCase() },
    });
  }



    /**
   * Client Repository - Handles CRUD operations for Client management.
   */
 async createClient(clientDetails){
  return await prisma.client.create({
    // data: {
    //     id: uuidv4(),
    //     clientDetails
    // }
    data: clientDetails
});
 }


async getAllClients(){
  return await prisma.client.findMany({
    orderBy: {
        order: 'asc'
    }
});
}


async updateClient(id,updateData){
  return await prisma.client.update({
    where: { id },
    data: updateData
});
}


async deleteClient(id){
  return await prisma.client.delete({
    where: { id }
});

}

async findClientById(id){
  return await prisma.client.findUnique({
    where: { id }
});
}


    /**
   * Stats Repository - Handles CRUD operations for Stats management.
   */


// Get-All Counts

async safeCount(model) {
  try {
      // Dynamically access the Prisma model
      if (!prisma[model]) {
          console.error(`Model ${model} not found in Prisma client`);
          return 0;
      }
      return await prisma[model].count();
  } catch (error) {
      console.error(`Error counting ${model}:`, error);
      return 0;
  }
}

// Safely wrap conditional count operations
async safeConditionalCount(model, condition = {}) {
  try {
      if (!prisma[model]) {
          console.error(`Model ${model} not found in Prisma client`);
          return 0;
      }
      return await prisma[model].count({ where: condition });
  } catch (error) {
      console.error(`Error counting ${model} with condition:`, error);
      return 0;
  }
}

async getTotalClients() {
  return this.safeCount('client');
}

async getActiveClients() {
  return this.safeConditionalCount('client', { isActive: true });
}

async getTotalBlogs() {
  return this.safeCount('blog');
}

async getTotalServices() {
  return this.safeCount('service');
}

async getTotalUsers() {
  return this.safeCount('user');
}

async getTotalFaqs() {
  return this.safeCount('fAQ');
}

async getTotalTestimonials() {
  return this.safeCount('testimonial');
}

async getTotalCatalogues() {
  return this.safeCount('catalogue');
}

async getActiveCatalogues() {
  return this.safeConditionalCount('catalogue', { isActive: true });
}

async getUnreadEnquiries() {
  return this.safeConditionalCount('enquiries', { status: "unread" });
}

async getTotalEnquiries() {
  return this.safeCount('enquiries');
}

async getTotalNewsletterSubscribers() {
  return this.safeCount('newsletter');
}

async getUnreadNotifications() {
  return this.safeConditionalCount('notification', { isRead: false });
}

async getActiveSocialLinks() {
  return this.safeConditionalCount('social', { isActive: true });
}

async getActiveTeamMembers() {
  return this.safeConditionalCount('team', { isActive: true });
}

async getEnquiriesLast7Days() {
  try {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      const enquiries = await prisma.enquiries.findMany({
          where: {
              createdAt: {
                  gte: sevenDaysAgo,
              },
          },
      });

      const groupedData = {};
      enquiries.forEach((enquiry) => {
          const date = enquiry.createdAt.toISOString().split("T")[0];
          groupedData[date] = (groupedData[date] || 0) + 1;
      });

      return groupedData;
  } catch (error) {
      console.error("Error fetching enquiries:", error);
      return {};
  }
}


}

export default Repositorys;