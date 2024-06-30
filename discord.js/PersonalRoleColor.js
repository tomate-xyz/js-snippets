import { ApplicationCommandOptionType } from "discord.js";

export default {
  name: "changecolor",
  description: "Change the color of your role.",
  options: [
    {
      name: "hexcolorcode",
      description: "Color code in Hex format.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute(interaction, client) {
    let color = interaction.options.get("hexcolorcode").value;

    if(isValidHexColor(color) === false) {
      return interaction.reply({
        content: `This is not a valid Hex color code. \`#FFFFFF\` would be a valid format. Only 6 character Hex codes are supported.`,
        ephemeral: true,
      });
    }

    if(color === "#000000") color = "#010101";

    const existingRole = interaction.guild.roles.cache.find(
      (role) => role.name === `${interaction.user.id}`
    );

    if (existingRole) {
      await existingRole.edit({ color: `${color}` });

      return interaction.reply({
        content: `Updated your role color to \`${color}\``,
        ephemeral: true,
      });
    } else {
      const role = await interaction.guild.roles.create({
        name: `${interaction.user.id}`,
        color: `${color}`,
        position: 6,
        hoist: false,
      });

      const member = await interaction.guild.members.fetch(interaction.user.id);
      await member.roles.add(role);

      return interaction.reply({
        content: `Changed your role color to \`${color}\``,
        ephemeral: true,
      });
    }
  },
};


function isValidHexColor(color) {
  if (!color.startsWith('#')) {
      return false;
  }

  color = color.slice(1);

  if (color.length !== 6) {
      return false;
  }

  for (let i = 0; i < color.length; i++) {
      const char = color[i];
      if (!/[0-9a-f]/i.test(char)) {
          return false;
      }
  }

  return true;
}
