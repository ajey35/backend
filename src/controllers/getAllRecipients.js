import prisma from "../config/PrismaCleint.js";

const AllRecipients = async () => {
  try {
    // Fetch all recipients and their organization details
    const allRecipients = await prisma.user.findMany({
      where: { role: "RECIPIENT" }, // Only include users with the "RECIPIENT" role
      select: {
        email: true,
        phone: true,
        organization: {
          select: {
            email: true,
          },
        },
      },
    });

    // Extract relevant data
    const recipientsData = allRecipients.map(recipient => ({
      email: recipient.email,
      phone:recipient.phone,
      organizationEmail: recipient.organization?.email || null,
    }));

    return recipientsData;
  } catch (error) {
    console.error("Error fetching recipients:", error.message);
    throw error;
  }
};

export default AllRecipients;
