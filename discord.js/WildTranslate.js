import {
  ApplicationCommandOptionType,
  EmbedBuilder
} from "discord.js";

export default {
  name: "translate",
  description: "Translate text into different languages and then back to German.",
  options: [{
      name: "text",
      description: "Text to translate",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "sequences",
      description: "Number of language sequences. 1-40",
      type: ApplicationCommandOptionType.Integer,
      required: false,
    }
  ],

  async execute(interaction) {
    let text = interaction.options.get("text").value;
    let sequences = interaction.options.get("sequences")?.value || 40;

    if (text.length > 1000) {
      return interaction.reply({
        content: "Text is too long, try something under 1000 characters.",
        ephemeral: true
      })
    }

    if (sequences > 40) {
      return interaction.reply({
        content: "Sequence number is too long, try something under 40.",
        ephemeral: true
      })
    }

    if (sequences <= 0) {
      return interaction.reply({
        content: "Sequence number cannot be 0 or lower, try something above 0.",
        ephemeral: true
      })
    }

    async function translateAndBack(inputText) {
      const languages = ['fi', 'zh-CN', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'hi', 'ar', 'nl', 'sv', 'tr', 'pl', 'el', 'da', 'no', 'af', 'sw', 'vi', 'th', 'id', 'he', 'fa', 'uk', 'cs', 'sk', 'hu', 'ro', 'bg', 'sr', 'hr', 'sl', 'lt', 'lv', 'et', 'sq', 'mk', 'hy', 'ka', 'bn'].sort(() => Math.random() - 0.5);
      let translatedText = inputText;
      let languageSequence = "text";

      const message = await interaction.reply(`Translating \`${text}\` for you now, please wait.`);

      for (let i = 0; i < sequences - 1; i++) {
        const fromLang = i === 0 ? 'de' : languages[i - 1];
        const toLang = languages[i];
        languageSequence += ` > ${toLang}`;
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(translatedText)}`);
        const data = await response.json();

        translatedText = data[0][0][0];
      }

      if (languages.includes('de')) {
        const finalResponse = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${languages[languages.length - 1]}&tl=de&dt=t&q=${encodeURIComponent(translatedText)}`);
        const finalData = await finalResponse.json();
        translatedText = finalData[0][0][0];
        languageSequence += " > de";
      } else {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${languages[languages.length - 1]}&tl=de&dt=t&q=${encodeURIComponent(translatedText)}`);
        const data = await response.json();
        translatedText = data[0][0][0];
        languageSequence += ` > ${languages[languages.length - 1]} > de`;
      }

      const embed = new EmbedBuilder()
        .setColor("#ADD8E6")
        .setTitle(`Translate`)
        .addFields({
          name: "📗 Text:",
          value: `\`${text}\``,
        }, {
          name: "📘 Translated Text:",
          value: `\`${translatedText}\``,
        }, {
          name: "🔤 Language Sequence:",
          value: `\`${languageSequence}\``,
        })
        .setTimestamp(Date.now());

      await interaction.editReply({
        content: "",
        embeds: [embed]
      });
    }

    translateAndBack(text)
      .catch(error => console.error("Error:", error));
  },
};
