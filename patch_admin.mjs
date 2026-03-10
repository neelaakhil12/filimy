import fs from 'fs';

const file = 'src/app/admin/page.js';
let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

// Fix actor map: replace bare <> with React.Fragment key
content = content.replace(
    `                                    {actorData.map(actor => {
                                        const isOpen = expandedRow === actor.id;
                                        return (
                                            <>
                                                <tr key={actor.id}`,
    `                                    {actorData.map(actor => {
                                        const isOpen = expandedRow === actor.id;
                                        return (
                                            <React.Fragment key={actor.id}>
                                                <tr`
);
content = content.replace(
    `                                            </>
                                        );
                                    })}`,
    `                                            </React.Fragment>
                                        );
                                    })}`
);

// Also remove key from detail row (key goes on Fragment now)
content = content.replace(
    `<tr key={actor.id + '-detail'} className={styles.detailRow}>`,
    `<tr className={styles.detailRow}>`
);

// Fix request map: replace <> with React.Fragment
content = content.replace(
    `                                        <>
                                            <tr key={req.id}`,
    `                                        <React.Fragment key={req.id}>
                                            <tr`
);
content = content.replace(
    `                                        </>
                                     ))}`,
    `                                        </React.Fragment>
                                     ))}`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Done. Key prop warnings fixed.');
