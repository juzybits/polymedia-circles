import '../css/FAQ.less';

export const FAQ: React.FC = () =>
{
    return <>
    <div id='faq-page'>
        <div id='title'>
            <h1>Circles.</h1>
            <h2>by <a id='by_polymedia' href='https://polymedia.app/' target='_blank'>Polymedia</a></h2>
        </div>
        <div id='faq'>
            <h1>F.A.Q.</h1>

            <div id='note'>
                * Last update: June 7, 2023
                <br/>
                * This living document is subject to change.
            </div>


            <div className='question'>
                <h2>What is Polymedia Circles?</h2>
                <p>Polymedia Circles is a generative art project built on Sui.</p>
                <p>From one point of view, it is a series of digital collectables.</p>
                <p>From another point of view, it is code that generates visual art.</p>
            </div>

            <div className='question'>
                <h2>What is generative art?</h2>
                <p>In the <Link text='words' href='https://www.youtube.com/watch?v=ysIiX7QlBms' /> of Tyler Hobbs: generative art involves thinking about artwork systematically. It's about designing a process that creates the artwork. The artist is focused on that system, rather than on an individual image that might come out of it. You purposefully relax your grip on that final image, allowing for randomness to play a role in exactly what image is produced by the system.</p>
            </div>

            <div className='question'>
                <h2>What are the project goals?</h2>
                    <p>1. The artwork should be generated fully on-chain. No preprocessing is allowed. Because the artwork will be created on the fly during a mint transaction, the code must be efficient in order to reduce Sui computation fees.</p>

                    <p>2. The artwork should be stored fully on-chain. No links to external storage like AWS or IPFS are allowed. Therefore, the artwork size (in bytes) must be small in order to reduce Sui storage fees and to stay within the object size limit.</p>

                    <p>3. The artwork should display natively in Sui wallets and explorers. No additional code or libraries are allowed. Therefore, the artwork must be compatible with the Sui <Link text='Display Standard' href='https://docs.sui.io/build/sui-object-display' /> so that it works everywhere out of the box.</p>

                    <p>4. The artwork should be dynamic. Owners will have the ability to modify it according to certain rules. This introduces a new element of creative unpredictability: not only are the initial artworks generated algorithmically, but subsequent versions will depend on the choices of their owners.</p>
            </div>

            <div className='question'>
                <h2>How does it work?</h2>
                <p>When someone sends a mint transaction, an <Link text='SVG' href='https://developer.mozilla.org/en-US/docs/Web/SVG' /> is built on-chain using the Circles algorithm sprinkled with randomness. The SVG is then formatted as a <Link text='data URL' href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs' /> in the artwork's <Link text='Display' href='https://docs.sui.io/build/sui-object-display' />, so that it renders an image in wallets and explorers.</p>
                <p>Each artwork consists of a background and between 2 and 5 circles. The background and circle colors are random, within a predefined palette of 216 colors. The circle position and size are also random, within the limits of the canvas. Smaller circles are rendered on top, so that every circle is visible.</p>
                <p>Each artwork is represented on-chain as a Sui object. It not only stores its own SVG representation, which allows it to be displayed as an image, but also the properties of its components, such as the size and color of each circle. This is what enables the dynamic nature of Polymedia Circles.</p>
            </div>

            <div className='question'>
                <h2>How is the artwork dynamic?</h2>
                <p>At this time I have implemented two dynamic features, but many more are possible and may be added in the future. I believe these two simple features are enough to introduce an element of human selection on top of the algorithmic randomness which will lead to more aesthetic and interesting outcomes.</p>
                <p>1) Recycling artwork: holders can destroy existing artwork objects in order to mint new artwork at a big discount. Because aspects of Polymedia Circles are random, some pieces will be more aesthetic than others. If a minter is not happy with the artwork they got, they can recycle it into a new one for just 10% of the full price.</p>
                <p>2) Blending artwork: sometimes an artwork is almost perfect... if only you make one change! Well, Polymedia Circles lets holders combine two artworks by picking which individual circles they'd like to swap. This means holders can refine their artwork according to their individual taste while shaping the collection in the process.</p>
            </div>

            <div className='question'>
                <h2>What kind of ownership do holders have?</h2>
                <p>From a copyright perspective, you are free to use your artwork however you like, even commercially. The exact license is yet to be decided, but I am leaning towards <Link text='CC BY-SA' href='https://creativecommons.org/licenses/by-sa/4.0/'/>.</p>
                <p>From a technical perspective, artworks are "owned" objects, which are completely controlled by their holders. There is no "shared" object wrapper that limits what you can do with your artwork.</p>
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
                <p>While technically there is no supply limit, in practice the increasing mint price (see previous question) will limit supply to most likely just a few hundred artworks.</p>
            </div>

            <div className='question'>
                <h2>Are there any royalties?</h2>
                <p>Provided I implement artwork ownership in the manner I described in <i>"What kind of ownership do holders have?</i>, royalties will not be enforceable.</p>
            </div>

            <div className='question'>
                <h2>Where will it trade?</h2>
                <p>Any venues that want to enable trading of Polymedia Circles are free to do so, as I will not be placing any constraints on the collection.</p>
            </div>

            <div className='question'>
                <h2>Where will it mint?</h2>
                <p><Link href='https://circles.polymedia.app/mint' target='_self' /></p>
            </div>

            <div className='question'>
                <h2>Is there a whitelist?</h2>
                <p>There can be a whitelist if there is interest. If you are a Polymedia supporter and want to be included, please reach out on Twitter. If I (<Link text='@juzybits' href='https://twitter.com/juzybits' />) follow you, or we've had a positive interaction in the past, there's a good chance you are eligible for the whitelist.</p>
            </div>

            <div className='question'>
                <h2>Still have questions?</h2>
                <p>Ask on Twitter or Discord:</p>
                <p><Link text='@juzybits' href='https://twitter.com/juzybits' /></p>
                <p><Link text='@polymedia_app' href='https://twitter.com/polymedia_app' /></p>
                <p><Link href='https://discord.gg/3ZaE69Eq78' /></p>
            </div>

            {/* <div className='question'>
                <h2>What are the security risks?</h2>

                <p>During mint: there is always a risk when you connect your wallet to a website, so please take the usual precautions: ideally use a burner wallet; read the transaction description in your wallet before approving it; make sure you are minting on https://circles.polymedia.app/mint.</p>

                <p>After mint: you will own a Sui object and nobody else but you can change it or move it. However:</p>

                <p>- As long as I own the <Link text='UpgradeCap' href='https://docs.sui.io/build/package-upgrades' /> object, I can release package upgrades that make changes like setting the mint price to zero (see <Link text='assess risk from package upgrades' href='https://github.com/MystenLabs/sui/issues/2045' />).</p>

                <p>- As long as I own the <Link text='Publisher' href='https://examples.sui.io/basics/publisher.html' /> object, I can make changes to the artwork <Link text='Display' href='https://examples.sui.io/basics/display.html' /> which can break or alter how everyone's artwork objects gets displayed in wallets.</p>

                <p>- Of course, I will not do either of those things. But an attacker might, if they steal the admin objects from me. Even if that happens, the attacker can't do anything to your artwork objects, and I can save the collection by deploying a new package that allows holders of the original artwork to re-mint for free in the new package.</p>

                <p>- Initially I will keep the "Publisher" and "UpgradeCap" objects, as this allows me to make improvements and potentially add new features. Eventually I may delete the admin objects, for example if development is frozen or if the risk of a hack increases.</p>
            </div> */}

        </div>
    </div>
    </>;
}

const Link: React.FC<{
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