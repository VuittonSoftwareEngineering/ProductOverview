# ProductOverview

## E-commerce Back-end 
I completed this project as part of the Hack Reactor program in January of 2023. The goal of the project was to maximize the performance of an API serving data from a large dataset containing millions of products, styles, and skus for a fictional e-commerce website.

## Performance Optimization Summary
* Before I deployed the site, I did some local optimization of the DB - some simple indexing and query optimization, getting local db query times from about 100ms to 20-40ms.
* Then I deployed the database and the API service. Before I started scaling, I had some pretty slow response times under load. Before any optimization, I was fine at 100 requests/sec, getting no errors and around 65 ms response times. However, at 1000 requests/sec, the response times slowed to 1000-2000ms. 
* The first and most substantial improvement I made was to implement a load balancing server. I deployed an Nginx server that routed the API calls across other API services. With only a second API service, response times at 1000 requests/sec dropped down under 100ms across all routes (between 60 and 90ms). Further increasing to 4 API services improved response times around 20%.
* I also implemented caching, and saw modest gains in response times at 1000 requests/sec, but was able to increase to 2000 requests/sec with similar response times but was finally able to keep the error rate under 1%
* There were some improvements I could have made. We were using a testing service based in WV, which simulated our customer base, but I’d deployed my servers in the aws west region 1. I’d have deployed the service in other regions. Of course, deploying on a better computer would have improved performance as well. In particular, when I was optimizing locally I had implemented clustering and seen strong performance improvements, but this was not available to me on the single core ec2 instance I was using. If I deployed on a better server I would have also built clustering into that and hopefully seen improvements similar to what I saw locally in addition to the improvements native to just a better machine. 


