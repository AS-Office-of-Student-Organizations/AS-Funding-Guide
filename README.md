# Office of Student Organizations Website

This website is created with ReactJS and packaged with Vite. The website is currently hosted [here](https://studentorgs.netlify.app) until a new domain is chosen. 

To clone & install the required packages, you'll first need npm. 

Additionally, the project also uses a TipTap pro extension, which requires your own API key (I needed this for the table of contents :]). Get the free license [here](https://tiptap.dev/pro-license?gad_source=1&gclid=Cj0KCQiAyc67BhDSARIsAM95QzvsEBjjcsDbRWMMmZUjiinKMZxVzmXWdPvowE0G6DXLuBlJGsJ_inkaApPsEALw_wcB), then create your .env file with `TIPTAP_PRO_TOKEN={YOUR_TOKEN}`. 

After this, you should be able to use `npm install` then `npm run dev` to host the site locally! 

## Project Context

This website addresses a pressing need of student organizations leaders which is a **user friendly funding guide**. The current funding guide ([here](https://finance.ucsd.edu/Home/FundingGuide)) is very frustrating to read. 

However, beyond this goal of just hosting the guide, we hope to make it easier to get fast Q&A answers with a RAG-based LLM chatbot on our homepage! We are still building the backend for that, but we are looking forward to connecting that.
