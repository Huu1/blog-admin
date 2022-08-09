export const menuTreeHandle = (
  array: any[],
  levelName = "level",
  childrenName = "children"
) => {
  const recursive = (array: any, level = 0, path = "") => {
    level++;
    return array.map((v: any) => {
      v[levelName] = level;
      const child = v[childrenName];
      if (path) {
        v.path = path === "/" ? path : path + v.path;
      }
      if (child && child.length) recursive(child, level, v.path);
      return v;
    });
  };
  return recursive(array);
};

export const getTreeItem = (treeList: any, keyName: string, key: any) => {
  for (let i = 0; i < treeList.length; i++) {
    let treeItem = treeList[i];
    if (treeItem[keyName] === key) {
      return treeItem;
    } else {
      if (treeItem.children && treeItem.children.length > 0) {
        let res: any = getTreeItem(treeItem.children, keyName, key);
        if (res) {
          return res;
        }
      }
    }
  }
};

export const getTreeIds = (tree: any, nodeId: any, config?: any) => {
  const { children = "children", id = "id" } = config || {};

  const toFlatArray = (tree: any[], parentId?: any): any => {
    return tree.reduce((t, _) => {
      const child = _[children];
      return [
        ...t,
        parentId ? { ..._, parentId } : _,
        ...(child && child.length ? toFlatArray(child, _[id]) : []),
      ];
    }, []);
  };
  const getIds = (flatArray: any[]) => {
    let ids = [nodeId];
    let child = flatArray.find((_) => _[id] === nodeId);
    while (child && child.parentId) {
      ids = [child.parentId, ...ids];
      // eslint-disable-next-line no-loop-func
      child = flatArray.find((_) => _[id] === child.parentId);
    }
    return ids;
  };

  return getIds(toFlatArray(tree));
};
