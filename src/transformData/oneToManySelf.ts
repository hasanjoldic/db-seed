/**
 * Seed tables that have a self-reference of the one-to-many type. For example, tags are can be subtype of another tag.
 *
 * @param parentNodes when this recursive function is called, on the first call the parentNodes will be root nodes. That means they will have no reference to other parent nodes.
 * @param childNodes all the other nodes in the table except the root nodes.
 * @param maxChildren how many child nodes is each parent node allowed to have.
 * @param transformChildNode function to be applied to each child node
 * @param shouldBeParentNode function to check whether a node should be a parent node in the next recursive call to onToManySelf function
 */
export function oneToManySelf<T>({
  parentNodes,
  childNodes,
  maxChildren,
  transformChildNode,
  shouldBeParentNode,
}: {
  parentNodes: T[];
  childNodes: T[];
  maxChildren: number;
  transformChildNode: (childNode: T, parentNode: T) => void;
  shouldBeParentNode: (node: T) => boolean;
}) {
  let edgesCounter = 0;
  for (const [i, currentChild] of childNodes.entries()) {
    const currentParent = parentNodes[i % parentNodes.length];

    transformChildNode(currentChild, currentParent);

    // if we applied the transformation to every parent, reset the counter
    if (i % parentNodes.length === parentNodes.length - 1) {
      edgesCounter++;
    }

    if (edgesCounter === maxChildren) {
      break;
    }
  }

  parentNodes = childNodes.filter(shouldBeParentNode);
  childNodes = childNodes.filter((o1) => parentNodes.find((o2) => o2 === o1));

  if (childNodes.length) {
    oneToManySelf({
      parentNodes,
      childNodes,
      maxChildren,
      transformChildNode,
      shouldBeParentNode,
    });
  }

  return childNodes;
}
