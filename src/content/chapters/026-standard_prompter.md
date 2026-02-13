# A standardized prompting tool for AI-assisted policy work

Public Policy Lab has developed a standardized prompting tool that lets staff across public bodies get high-quality outputs from AI tools like Claude or ChatGPT without needing to be skilled at prompting themselves. The tool provides a library of form-based templates — covering everything from cabinet papers to UN project documents to GIS workflows — where users fill in the specifics of their task and the tool generates a complete, detailed prompt that embeds best practices, methodological frameworks, and formatting requirements. The prompting expertise gets encoded into the template rather than residing only in individual staff members' heads.

## Why prompting skill matters and why it varies

AI tools generate outputs based on the instructions you give them, and the same tool can produce dramatically different results depending on how you ask. A vague prompt like "write me a report on housing policy" will produce something generic. A detailed prompt that specifies the audience, the structure, the key arguments to emphasize, the data sources to draw from, and the format to follow will produce something much more useful — the difference can be between an output you throw away and one you can actually build on.

Getting good results from AI tools is a genuinely novel skill. It involves learning quirks of how AI models interpret language, certain phrasings work better than others, certain instructions get followed more reliably, certain formats produce cleaner outputs. It involves knowing what AI tools are good at (generating first drafts, structuring information, following templates) and what they tend to get wrong without warning (specific facts, recent events, complex calculations, nuanced judgment calls). People who have spent time learning these patterns can get much more value from AI tools than people who have not, which creates a problem when organizations want to use AI tools across their staff: one staff member produces excellent first drafts that save hours of work, while another using the same tool produces outputs not much better than starting from scratch.

This matters especially for complex outputs where detailed instructions need to be followed. A cabinet paper has a specific structure and requires particular kinds of strategic framing. An advocacy plan should follow established frameworks for stakeholder mapping and tactical sequencing. UN project documents have their own formats and requirements. Staff who do not know these formats cannot prompt for them effectively, even if the AI tool is perfectly capable of producing them given the right instructions. A senior analyst who understands research methodology can prompt for rigorous causal analysis; a junior staffer may not know to ask for a directed acyclic graph or to specify threats to validity — not because they could not use that output, but because they do not know it exists or how to request it.

## How the templates work

When a staff member needs to write a cabinet paper, they do not need to know from memory every element that should be included. They fill in a form with the policy area, the source materials to draw from, the preferred outcome, and the narrative framing they want to emphasize. The template generates a prompt that instructs the AI to structure the analysis properly, to present options with costs and benefits, to include implementation considerations, to frame the preferred option persuasively while maintaining professional objectivity — all the elements that make cabinet papers effective. The staff member provides the content; the template provides the methodology.

This also helps junior staff who may not know specific formats or requirements. Rather than waiting for busy senior staff to provide detailed instructions before they can even start a task, junior staff can use the templates to generate first drafts that follow proper structure. Senior staff can then review and refine rather than having to explain everything from scratch. The templates encode institutional knowledge about how documents should be structured, making that knowledge accessible to everyone rather than requiring it to be transferred person-by-person. The AI output is a starting point, not a finished product — but a good starting point can save hours of work, and technical staff can spend their time on substantive analysis rather than on formatting and boilerplate.

## Data entry, format conversion, and project management

Beyond document drafting, the templates address another time sink: converting information between formats. Complex forms, project management systems, and case management tools often require data to be entered in specific structures — particular Excel column layouts, CSV formats, JSON structures that can be imported into software. Manually entering this data is tedious and error-prone, especially when dealing with large text fields that are awkward to work with in spreadsheets. The prompting tool includes templates that take raw information and convert it to the specific structure needed for import, saving the manual data entry work.

For project management, this means staff can work with exported spreadsheets, editing many projects at once rather than clicking through a portal one project at a time, and then re-import the data. For reporting, AI tools can generate properly formatted Excel files with the right tabs, columns, and formulas when given the right prompts — prompts that most staff would not know how to write from scratch but that can be encoded into templates. Converting scanned PDFs or unstructured documents into specific data structures follows the same logic: the template encodes what the conversion should look like, so staff do not need to figure it out each time.

## Why templates work better than training alone

Organizations could try to train all staff to prompt effectively. But prompting skill involves patterns and intuitions that come from practice and experimentation, and different people will develop different levels of skill no matter how much training they receive. More importantly, good prompting for complex outputs requires knowing the relevant methodology. Training a staff member to prompt for rigorous research methods requires first training them in research methods. Training them to prompt for proper UN document formats requires first training them in UN document formats. The templates bypass this by encoding the methodology directly: staff do not need to know what a directed acyclic graph is to prompt for one if the template includes it automatically.

The template approach also allows institutional learning to accumulate. When a particular framing proves effective in cabinet papers, or a particular visualization approach communicates data well, that knowledge can be encoded into the template and benefit all future use. New staff benefit immediately from accumulated institutional knowledge rather than having to learn effective prompting through trial and error. Quality control becomes possible at the template level: improve the template once, and the improvement applies to all subsequent outputs.

## Available templates

The tool currently includes templates across the following categories:

Standard reports and documents: standard report, presentation, briefing note, cabinet/council paper, standard operating procedure, action plan, business plan.

Visualizations: chart/visualization (with tool-specific instructions for Datawrapper, Flourish, ggplot2, Tableau), infographic, dashboard.

Research: research paper, research methods (covering quantitative, qualitative, and mixed methods with causal inference frameworks), deep research prompt, data cleaning plan.

Advanced technical: GIS/QGIS workflows, AnyLogic simulation models, network models, Monte Carlo simulations.

Project management: project management plan, project timeline, OpenProject-specific formatting for bulk import.

Proposals: grant proposal, CSR proposal, bid submission.

Policymaking and strategy: risk analysis, narrative framing, advocacy plan (with full 10-part strategic framework), policy resilience plan, policy windows analysis, change agents mapping, talking points, PDIA plan, positive deviance plan, rapid results plan, SWOT/PEST/CICO strategic analysis, sector strategy paper.

Media and communications: press release, YouTube video script, Substack/blog post, TikTok video script, LinkedIn article.

International organization formats: World Bank/ADB documents (systematic country diagnostic, country partnership framework, project appraisal document, implementation status report, implementation completion report, country economic memorandum), IMF Article IV staff report, UN system documents (common country analysis, project document/ProDoc, midterm evaluation, social and environmental screening, final evaluation report, IRRF report), technical assistance report, international treaty report.

All templates include embedded style guidance that addresses common AI writing problems — the characteristic phrasings, excessive hedging, and superficial analysis that plague poorly-prompted outputs — so that results read as professionally written rather than obviously AI-generated.
