import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import axios from "axios";

export default {
  name: "dictionary",
  description: "Fetch an article from the Urban Dictionary.",
  options: [
    {
      name: "term",
      description: "The search term you want an article of.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute(interaction) {
    let term = interaction.options.get("term").value;
    const encodedTerm = encodeURIComponent(term);

    if (term.length <= 0) {
        return interaction.reply({
          content: `Invalid Search term.`,
          ephemeral: true,
        });
      }

    if (term.length >= 30) {
      return interaction.reply({
        content: `Search term too long. Try one that's smaller than 30 characters.`,
        ephemeral: true,
      });
    }

    axios
      .get(`https://api.urbandictionary.com/v0/define?term=${encodedTerm}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.list && response.data.list.length > 0) {
          console.log("Definition:", response.data.list[0].definition);
          const embed = new EmbedBuilder()
            .setColor("#FFA500")
            .setTitle(`${response.data.list[0].word}`)
            .setURL(`${response.data.list[0].permalink}`)
            .setDescription(`${response.data.list[0].definition}`)
            .addFields({
              name: "🗒️ Example:",
              value: `${response.data.list[0].example}`,
            })
            .setFooter({
              text: `⬆️ • ${response.data.list[0].thumbs_up} | ⬇️ • ${response.data.list[0].thumbs_down}`,
              iconURL: "https://www.urbandictionary.com/favicon-32x32.png",
            })
            .setTimestamp(Date.now());

          interaction.reply({
            embeds: [embed],
          });
        } else {
          interaction.reply({
            content: `No definition for \`${term}\` found.`,
            ephemeral: true,
          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  },
};
