import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { AppContext } from './App';
import { addArtworkToContainer, removeArtworkFromContainer } from './lib/addArtworkToContainer';
import '../css/FAQ.less';

export const FAQ: React.FC = () =>
{
    const { layoutRef } = useOutletContext<AppContext>();

    useEffect(() =>
    {
        // Callback to handle resizing of the #faq-page div
        const observer = new ResizeObserver((entries) =>
        {
            if (!layoutRef.current) {
                return;
            }
            for (let entry of entries) {
                addArtworkToContainer({
                    container: layoutRef.current,
                    canvasWidth: entry.contentRect.width,
                    canvasHeight: entry.contentRect.height,
                    minCircles: 30,
                    maxCircles: 30,
                });
            }
        });

        // Start observing the div
        if (layoutRef.current)
            observer.observe(layoutRef.current);

        // Cleanup function
        return () => {
            if (layoutRef.current) {
                observer.unobserve(layoutRef.current);
                removeArtworkFromContainer(layoutRef.current);
            }
        };
    }, []);

    return <>
    <div id='faq-page'>
        <div id='faq-faq'>
            <h1>F.A.Q.</h1>

            <div id='note'>
                * Last update: June 17, 2023
                <br/>
                * This document is subject to change.
            </div>


            <div className='question'>
                <h2>What is Polymedia Circles?</h2>

                <p>Polymedia Circles is a generative art project on Sui.</p>
                <p>From one point of view, it is a series of digital collectables.</p>
                <p>From another point of view, it is code that generates visual art.</p>
            </div>

            <div className='question'>
                <h2>What is generative art?</h2>

                <p>"Generative art involves thinking about artwork systematically. It's about designing a process that creates the artwork. The artist is focused on that system, rather than on an individual image that might come out of it. You purposefully relax your grip on that final image, allowing for randomness to play a role in exactly what image is produced by the system." — Tyler Hobbs</p>
            </div>

            <div className='question'>
                <h2>What are the project goals?</h2>

                    <p>1. The artwork should be <b>created on-chain</b>, on the fly, within a mint transaction. No preprocessing is allowed. Therefore, the code must be efficient in order to reduce Sui computation fees.</p>

                    <p>2. The artwork should be <b>stored on-chain</b>. No links to external storage like AWS or IPFS are allowed. Therefore, the artwork size (in bytes) must be small in order to reduce Sui storage fees and stay within the object size limit.</p>

                    <p>3. The artwork should <b>display natively</b> in Sui wallets and explorers. No additional code or libraries are allowed. Therefore, the artwork must be compatible with the Sui <A text='Display Standard' href='https://docs.sui.io/build/sui-object-display' /> so that it works everywhere out of the box.</p>

                    <p>4. The artwork should be <b>dynamic</b>, giving owners the ability to modify it according to certain rules. This introduces a new element of creative unpredictability: not only are the initial artworks generated algorithmically, but subsequent versions will depend on the choices of their owners.</p>
            </div>

            <div className='question'>
                <h2>How is the artwork dynamic?</h2>

                <p>I have implemented two dynamic features so far (many more are possible, suggestions are welcome). These features introduce an element of human selection on top of the algorithmic randomness, which can lead to more aesthetic and interesting outcomes.</p>
                <p><b>1) Recycling.</b> Holders can destroy existing artworks in order to mint new ones at a very big discount. If for any reason a holder is not happy with an artwork they minted, they can recycle it into a new one for just 10% of the full price.</p>
                <p><b>2) Blending.</b> Holders can combine two artworks by picking which circles they'd like to swap. In this way holders can refine their artwork according to their personal taste, while simultaneously shaping and curating the entire Polymedia Circles collection.</p>
            </div>

            <div className='question'>
                <h2>How does it work?</h2>

                <p>Artworks are Sui <A text='objects' href='https://docs.sui.io/learn/objects' />. An artwork object contains both its <A text='SVG' href='https://developer.mozilla.org/en-US/docs/Web/SVG' /> representation, which allows it to be displayed visually, as well as its components and their properties (like circle colors and sizes), which enables the dynamic nature of Polymedia Circles.</p>

                <p>When someone sends a mint transaction, a new artwork object is generated on-chain using the Circles algorithm, along with some randomness to ensure that each piece is unique. The artwork SVG representation is formatted as a <A text='data URL' href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs' /> by the artwork <A text='Display' href='https://docs.sui.io/build/sui-object-display' />, so that it can be shown as an image in Sui wallets and explorers.</p>

                <p>Each artwork consists of a background and between 2 and 5 circles. These elements are assigned random colors from a palette of 216 colors. The circles' positions and sizes are also random, within the limits of the canvas. Smaller circles are placed on top bigger ones, to ensure that all circles are visible.</p>
            </div>

            <div className='question'>
                <h2>Are some artworks rarer than others?</h2>

                <p>While all artwork combinations are equally likely to be produced by the algorithm, some arrangements may be more popular than others. For example:</p>
                <div id='faq-artwork-showcase'>
                    <div className='faq-artwork-item'>
                    <svg className="faq-artwork-svg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="rgb(100,193,193)" />
                            {/* blue */} <circle cx="500" cy="500" r="400" fill="rgb(131,224,255)" stroke="black" stroke-width="5" />
                            {/* yellow */} <circle cx="525" cy="475" r="280" fill="rgb(224,255,100)" stroke="black" stroke-width="5" />
                            {/* green */} <circle cx="550" cy="450" r="160" fill="rgb(131,255,131)" stroke="black" stroke-width="5" />
                            {/* red */} <circle cx="565" cy="435" r="65" fill="rgb(224,131,100)" stroke="black" stroke-width="5" />
                        </svg>
                        <div className='faq-artwork-description'>(1) Artwork with fully nested circles.</div>
                    </div>

                    <div className='faq-artwork-item'>
                        <svg className="faq-artwork-svg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="rgb(255,131,131)" />
                            {/* left */}  <circle cx="292" cy="362" r="117" />
                            {/* right */} <circle cx="708" cy="362" r="117" />
                            {/* head */}  <circle cx="500" cy="580" r="200" fill="rgb(255 224 193)"  />
                            {/* nose */} <circle cx="500" cy="600" r="50" />
                        </svg>
                        <div className='faq-artwork-description'>(2) Artwork that resemble something.</div>
                    </div>
                </div>
                <p>Ultimately, it is impossible to predict how participants will appraise and categorize instances of Polymedia Circles, so it will be interesting to find out.</p>
            </div>

            <div className='question'>
                <h2>What kind of ownership do holders have?</h2>

                <p>From a copyright perspective, holders are free to use the artwork however they like, even commercially. The exact license is yet to be decided, but I am leaning towards something like <A text='CC BY' href='https://creativecommons.org/licenses/by/4.0/'/>.</p>
                <p>From a technical perspective, artworks are "owned" objects that are completely controlled by their holders. There is no "shared" object wrapper that limits what you can do with your artwork.</p>
            </div>

            <div className='question'>
                <h2>Are there any royalties?</h2>

                <p>Provided I implement artwork ownership in the manner I described in the "What kind of ownership do holders have?", royalties will not be enforceable.</p>
            </div>

            <div className='question'>
                <h2>Is the code open source?</h2>

                <p>It will be.</p>
            </div>

            <div className='question'>
                <h2>How much does it cost?</h2>

                <p>Polymedia Circles has a unique minting mechanism. Instead of having a fixed mint price, each artwork will be slightly more expensive than the previous one. This means that the mint price will increase exponentially.
                </p>
                <p>
                    The exact initial mint price and growth factor are yet to be decided, but my idea is to start very cheap. As an example, if the initial price is 1 SUI and the price increments by 0.1% on each mint, then:
                </p>
                <p>
                - The 1st artwork costs 1.00 SUI<br/>
                - The 10th artwork costs 1.09 SUI<br/>
                - The 50th artwork costs 1.62 SUI<br/>
                - The 100th artwork costs 2.67 SUI<br/>
                - The 500th artwork costs 143 SUI<br/>
                - The 1000th artwork costs 20,752 SUI<br/>
                - The 2000th artwork costs 434,936,837 SUI<br/>
                </p>
            </div>

            <div className='question'>
                <h2>What is the total supply?</h2>

                <p>While technically there is no supply limit, in practice the increasing mint price (see previous question) will limit the total supply to most likely just a few hundred artworks.</p>
            </div>

            <div className='question'>
                <h2>Is there a whitelist?</h2>

                <p>There will be if there is interest. If you are a Polymedia supporter and want to be included, please reach out. If I follow you on Twitter, or we've had a positive interaction, there's a good chance you are eligible for the whitelist.</p>
            </div>

            <div className='question'>
                <h2>Still have questions?</h2>

                <p>Ask on Twitter or Discord:</p>
                <p><A text='@juzybits' href='https://twitter.com/juzybits' /></p>
                <p><A text='@polymedia_app' href='https://twitter.com/polymedia_app' /></p>
                <p><A href='https://discord.gg/3ZaE69Eq78' /></p>
            </div>

            {/* <div className='question'>
                <h2>Where will it trade?</h2>

                <p>Any venues that want to enable trading of Polymedia Circles are free to do so, as I will not be placing any constraints on the collection.</p>
            </div> */}

            {/* <div className='question'>
                <h2>Where will it mint?</h2>

                <p><Link to={'/mint'}>https://circles.polymedia.app/mint</Link></p>
            </div> */}

            {/* <div className='question'>
                <h2>What are the security risks?</h2>

                <p>During mint: there is always a risk when you connect your wallet to a website, so please take the usual precautions: ideally use a burner wallet; read the transaction description in your wallet before approving it; make sure you are minting on https://circles.polymedia.app/mint.</p>

                <p>After mint: you will own a Sui object and nobody else but you can change it or move it. However:</p>

                <p>- As long as I own the <A text='UpgradeCap' href='https://docs.sui.io/build/package-upgrades' /> object, I can release package upgrades that make changes like setting the mint price to zero (see <A text='assess risk from package upgrades' href='https://github.com/MystenLabs/sui/issues/2045' />).</p>

                <p>- As long as I own the <A text='Display' href='https://examples.sui.io/basics/display.html' /> or <A text='Publisher' href='https://examples.sui.io/basics/publisher.html' /> objects, I can modify or break how artwork gets displayed in wallets.</p>

                <p>- Of course, I will not do either of those things. But an attacker might, if they steal the admin objects from me. Even if that happens, the attacker can't do anything to the artwork objects you own, and I could rescue the collection by deploying a new package that allows holders of the original artwork to re-mint for free in the new package.</p>

                <p>- Initially I will keep the "Publisher" and "UpgradeCap" objects, as this allows me to make improvements and potentially add new features. Eventually I may delete the admin objects, for example if development is frozen or if the risk of a hack increases.</p>
            </div> */}

        </div>
    </div>
    </>;
}

const A: React.FC<{
    href: string,
    text?: string,
    target?: string
}> =
({
    text,
    href = '',
    target = '_blank',
}) => {
    return <a href={href} target={target}>{text||href}</a>
}