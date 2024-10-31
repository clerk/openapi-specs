/**
 * @typedef {Object} Actor
 * @property {string} username
 * @property {string} avatarUrl
 * @property {string} profileUrl
 */

/**
 * @typedef {Object} PRData
 * @property {string} title
 * @property {string} body
 * @property {Actor} actor
 * @property {string} prUrl
 */

/**
 * @typedef {Object} Formatter
 * @property {(data: PRData) => string} generateMsg
 */

/**
 * Slack is using their own Markdown format, see:
 * https://api.slack.com/reference/surfaces/formatting#basics
 * https://app.slack.com/block-kit-builder
 * @type {Formatter}
 */
const slackFormatter = {
  generateMsg: ({ title, body, actor, prUrl }) => {
    const markdown = text => ({ type: 'section', text: { type: 'mrkdwn', text } });
    const header = text => ({ type: 'header', text: { type: 'plain_text', text } });
    const context = (imgUrl, text) => ({
      type: 'context',
      elements: [
        ...(imgUrl ? [{ type: 'image', image_url: imgUrl, alt_text: 'avatar' }] : []),
        { type: 'mrkdwn', text },
      ],
    });
    const blocks = [];

    blocks.push(header(`openapi-specs: ${title}`));

    blocks.push(markdown(body));
    blocks.push(markdown('\n'));
    blocks.push(context(actor.avatarUrl, `<${actor.profileUrl}|*${actor.username}*> created <${prUrl}|this PR>.`));

    return JSON.stringify({ blocks });
  },
};

/**
 * @type {Record<string, Formatter>}
 */
const formatters = {
  slack: slackFormatter,
};

/*
 * @returns {Actor}
 */
const createActor = username => {
  return { username, avatarUrl: `https://github.com/${username}.png`, profileUrl: `https://github.com/${username}` };
};

const run = async () => {
  const { title, user, html_url } = JSON.parse(process.argv[2]);
  const body = process.argv[3];
  const actor = createActor(user.login);

  const formatter = formatters['slack'];
  if (!formatter) {
    throw new Error('Invalid formatter, supported formatters are: ' + Object.keys(formatters).join(', '));
  }

  console.log(formatter.generateMsg({ title, body, actor, prUrl: html_url }));
}

run()